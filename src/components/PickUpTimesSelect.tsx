import { Moment } from "moment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  pickUpTimes: Moment[],
  setPickUpTime: React.Dispatch<React.SetStateAction<Date|undefined>>;
}

const PickUpTimesSelect = ({pickUpTimes, setPickUpTime}: Props) => {
    return (
        <Select onValueChange={(value) => setPickUpTime(new Date(value))}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a pick up time" />
            </SelectTrigger>
            <SelectContent>
                {
                    pickUpTimes.map((time, index) => (
                        index !== 0 ? (
                            <SelectItem key={time.toDate().toString()} value={time.toDate().toString()}>{time.calendar()}</SelectItem>
                        ) : (
                            <SelectItem key={time.toDate().toString()} value={time.toDate().toString()}>{'ASAP - '+time.calendar()}</SelectItem>
                        )
                    
                    ))
                } 
            </SelectContent>
        </Select>  
    );
}

export default PickUpTimesSelect;