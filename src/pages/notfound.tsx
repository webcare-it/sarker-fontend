import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full container md:mx-auto mx-4">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-500">
            The page you requested might have been moved, deleted, or doesn't
            exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
