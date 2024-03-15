type Props = {
    title: string;
    description: string;
    image: string;
}

const MenuCard = ({title, description, image}: Props) => {
    return (
        <div className="h-[550px] flex flex-col justify-center items-center rounded-xl hover:border hover:border-primary-foreground bg-muted hover:bg-background px-10" >
            <img className="pb-5 pt-5 w-8/12 md:w-11/12" src={image}></img>
            <div className="">
                <div className="text-2xl mb-2 uppercase tracking-wide">{title}</div>
                <div className="text-md">{description}</div>
            </div>
        </div>
    );
};

export default MenuCard;