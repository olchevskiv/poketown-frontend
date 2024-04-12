
import { useAuth0 } from "@auth0/auth0-react";

import moment, { Moment } from "moment";
import { Restaurant } from "@/types";
import Loader from "./Loader";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Clock, MapPin, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import PickUpTimesSelect from "./PickUpTimesSelect";

type Props = {
  restaurant: Restaurant;
  setPickUpTime: React.Dispatch<React.SetStateAction<Date|undefined>>;
}

const PickupDetailsCard = ({restaurant, setPickUpTime}: Props) => {
    const { user, isLoading } = useAuth0();

    if (isLoading) {
        return <Loader />
    }

    const getNearestQuarterTime = () => {
        const time = moment();
        const remainder = 15 - (time.minute() % 15);
        const nearestTime = moment(time).add(remainder, "minutes").set('second',0);
        return nearestTime;
    }

    const checkDayIsOpen = (restaurant: Restaurant, day: string) => {
        return restaurant.daysOpen.includes(day);
    }

    const checkTimeIsOpen = (restaurant: Restaurant, time: number) => {
        return time >= restaurant.hourOpenStart && time < restaurant.hourOpenEnd;
    }

    const getQuarterTimes = (start: Moment) => {
        let times : Moment[] = [];

        times.push(start);
        let end = moment(start);
        end.set('hour', restaurant.hourOpenEnd);
        end.set('minute',0);
        end.set('second',0);

        var duration = moment.duration(end.diff(start));
        var quarterHours = duration.asHours() * 15;

        var continueLoop = true;

        for (let i = 1; (i < quarterHours) && continueLoop; i++) {
            let prevTime = times[i - 1];
            let time = moment(prevTime).add(15, "minutes");

            if (checkTimeIsOpen(restaurant,time.hour()) && checkDayIsOpen(restaurant,time.format('dddd'))) {
                times.push( time );
            } else {
                continueLoop = false;
            }
        }
        return times;
    }

    const generatePickupTimes = () => {
        
        let startDayOne = getNearestQuarterTime();
        let startDayTwo = moment().add(1,'days').startOf('day');
        startDayTwo.set('hour', restaurant.hourOpenStart);
        startDayTwo.set('minute',0);
        startDayTwo.set('second',0);
        let times = [];
        let dayOneTimes: string | any[] | ConcatArray<moment.Moment> = [];

        // get next day that restaurant is open
        while ( !checkDayIsOpen(restaurant,startDayTwo.format('dddd')) && startDayTwo > startDayOne ) {
            startDayTwo.add(1,"days");
            startDayTwo.set('hour', restaurant.hourOpenStart);
            startDayTwo.set('minute',0);
            startDayTwo.set('second',0);
        }

        if ( !checkDayIsOpen(restaurant,startDayOne.format('dddd')) && !checkTimeIsOpen(restaurant,startDayOne.hour()) ) {
            dayOneTimes = getQuarterTimes(startDayOne);
        }

        let dayTwoTimes = getQuarterTimes(startDayTwo);
        if (dayOneTimes.length > 0) {
            times = dayTwoTimes.concat(dayOneTimes);
            return  times;
        } else {
            return dayTwoTimes;
        }
        
    }

    const pickUpTimes = generatePickupTimes();

    return (
        <Card className="md:px-4 bg-background">
            <CardHeader className="text-lg uppercase pb-1">Pickup Details</CardHeader>
            <CardContent className="space-y-5">
                <Separator className="mb-5"/>

                <div className="flex flex-row items-center  mb-3">
                    <div className="w-1/12">
                        <MapPin className="text-primary-foreground"/>
                    </div>
                    {
                        restaurant && restaurant.address ? (
                            <div className="flex flex-row flex-wrap justify-between items-center">
                                <div className="flex flex-col self-start text-wrap text-md">
                                    <div>{restaurant.address}</div>
                                    <div>{restaurant.city}, {restaurant.state} {restaurant.zipCode}</div>
                                    <div>
                                        <span className="mr-1">{restaurant.daysOpen[0]} - {restaurant.daysOpen[restaurant.daysOpen.length - 1]} </span>
                                        <span>
                                            {restaurant.hourOpenStart}{restaurant.hourOpenStart >= 12 ? 'pm' : 'am'}-
                                            {restaurant.hourOpenEnd > 12 ? restaurant.hourOpenEnd - 12 : restaurant.hourOpenEnd}{restaurant.hourOpenEnd >= 12 ? 'pm' : 'am'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-x-2 items-center mb-3 w-full text-md">
                                <Link to="/locations" className=" w-full font-bold hover:underline hover:text-primary">Select a location</Link>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-row items-center mb-3d">
                    <div className="w-1/12">
                        <Clock className="text-primary-foreground"/>
                    </div>
                    <div className="flex flex-col justify-between mb-3 w-full">
                        <div className="textmd w-full">Pickup time</div> 
                        <PickUpTimesSelect pickUpTimes={pickUpTimes} setPickUpTime={setPickUpTime}/>
                              
                    </div>
                </div>

                <div className="flex flex-row items-center  mb-3">
                    <div className="w-1/12">
                        <User className="text-primary-foreground"/>
                    </div>
                    <div className="flex flex-col justify-between mb-3 w-full">
                        {user?.name}
                        <br/>{user?.email}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PickupDetailsCard;