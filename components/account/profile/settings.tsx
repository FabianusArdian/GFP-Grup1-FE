// "use client";

// import { Card } from "@/components/ui/card";
// import { useAccount } from "@/lib/hooks/use-account";
// import { ProfileForm } from "./profile-form";
// import { SecurityForm } from "./security-form";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";

// export function ProfileSettings() {
//   const { profile, isLoading, updateProfile } = useAccount();

//   if (isLoading) {
//     return (
//       <div className="space-y-8">
//         <Skeleton className="h-8 w-48" />
//         <Card className="p-6">
//           <div className="space-y-4">
//             <Skeleton className="h-10 w-full" />
//             <Skeleton className="h-10 w-full" />
//             <Skeleton className="h-10 w-full" />
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold">Profile Settings</h1>

//       <Tabs defaultValue="profile">
//         <TabsList>
//           <TabsTrigger value="profile">Profile Information</TabsTrigger>
//           <TabsTrigger value="security">Security</TabsTrigger>
//         </TabsList>

//         <TabsContent value="profile">
//           <Card className="p-6">
//             <ProfileForm profile={profile} onSubmit={updateProfile} />
//           </Card>
//         </TabsContent>

//         <TabsContent value="security">
//           <Card className="p-6">
//             <SecurityForm />
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
