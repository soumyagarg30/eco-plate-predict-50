
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import RestaurantMenu from "@/components/restaurant/RestaurantMenu";
import FoodWastageModel from "@/components/restaurant/FoodWastageModel";
import FoodPrepModel from "@/components/restaurant/FoodPrepModel";
import PackagingModel from "@/components/restaurant/PackagingModel";
import RestaurantSidebar from "@/components/restaurant/RestaurantSidebar";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurantData, setRestaurantData] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in as restaurant
    const userType = localStorage.getItem("foodieSync_userType");
    const userData = localStorage.getItem("foodieSync_userData");

    if (userType !== "restaurant" || !userData) {
      toast({
        title: "Unauthorized",
        description: "Please login as a restaurant to access this page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Set restaurant data
    setRestaurantData(JSON.parse(userData));
  }, [navigate, toast]);

  if (!restaurantData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestaurantSidebar restaurantName={restaurantData.Restaurant_Name} />
      
      <div className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foodie-green-dark">
            Welcome, {restaurantData.Restaurant_Name}
          </h1>
          <p className="text-gray-600">
            Manage your menu, analyze sustainability metrics, and optimize your operations
          </p>
        </header>

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="wastage">Food Wastage Model</TabsTrigger>
            <TabsTrigger value="prep">Food Preparation Model</TabsTrigger>
            <TabsTrigger value="packaging">Sustainable Packaging</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            <Card>
              <CardContent className="p-6">
                <RestaurantMenu restaurantId={restaurantData.id} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wastage">
            <Card>
              <CardContent className="p-6">
                <FoodWastageModel restaurantId={restaurantData.id} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prep">
            <Card>
              <CardContent className="p-6">
                <FoodPrepModel restaurantId={restaurantData.id} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="packaging">
            <Card>
              <CardContent className="p-6">
                <PackagingModel restaurantId={restaurantData.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
