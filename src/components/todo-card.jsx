import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const TodoCard = ({ userId, title, isCompleted }) => {
  return (
    <Card className="max-w-[70%] mx-auto my-2">
      <CardHeader>
        <CardTitle>Todo By UserId: {userId}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{title}</p>
      </CardContent>
      <CardFooter>
        <p>Status: {isCompleted ? "completed" : "pending"}</p>
      </CardFooter>
    </Card>
  );
};
