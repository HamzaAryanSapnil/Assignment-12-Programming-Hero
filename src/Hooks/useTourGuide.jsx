import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: isAdmin, isPending: isAdminLoading } = useQuery({
//     enabled: !loading,
//     queryKey: ["isAdmin", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//       return res.data?.admin;
//     },
//   });

//   return [isAdmin, isAdminLoading];

const useTourGuide = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTourGuide, isLoading: isTourGuideLoading, refetch: tourRefetch } = useQuery({
      enabled: !loading,
      queryKey: [user?.email, "isTourGuide"],
      queryFn: async () => {
          const res = await axiosSecure.get(`/users/tourGuide/${user?.email}`);
          console.log(res?.data);
        return res?.data?.tourGuide;
      },
    });

    return [isTourGuide, isTourGuideLoading, tourRefetch];
};

export default useTourGuide;