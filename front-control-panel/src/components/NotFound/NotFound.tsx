import "./_notFound.scss";

interface NotFoundDataProps {
  message: string;
}

export const NotFoundData = ({ message }: NotFoundDataProps) => {
  return (
    <div className="not-found">
      <h1>{message}</h1>
    </div>
  );
}
