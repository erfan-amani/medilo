const Card = (props) => {
  return (
    <div className="flex flex-col items-center bg-white gap-4 p-12 w-11/12 sm:w-3/5 md:w-1/2 xl:w-1/3 rounded-sm shadow-lg">
      {props.children}
    </div>
  );
};

export default Card;
