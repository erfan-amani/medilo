const Card = (props) => {
  return (
    <div className="flex flex-col items-center bg-white gap-4 p-12 w-2/3">
      {props.children}
    </div>
  );
};

export default Card;
