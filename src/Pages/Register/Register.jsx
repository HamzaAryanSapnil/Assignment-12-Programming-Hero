import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Container from "../Shared/Container";
import { imageUpload } from "../../Api";
const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const { createUser, updateUserProfile, loading, setLoading,  } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    console.log(data);
    const email = data?.email;
    const password = data?.password;
    const name = data?.firstName + " " + data?.lastName;
    const image = data?.image[0];
    // const formData = new FormData();
    // formData.append("image", image);
    console.log(image);
    console.log(import.meta.env.VITE_IMAGEBB_API_KEY);
    

    try {
      // 1 upload image and get image url
      setLoading(true);
      const image_url = await imageUpload(image);
      console.log(image_url);

      const result = await createUser(email, password);
      
      console.log(result);
      
      // console.log(result?.user?.displayName);
      // save userInfo in firebase
      await updateUserProfile(name, image_url);

      const userInfo = {
        displayName: name,
        photoURL: image_url,
        email: email,
        role: "user",
        status: "verified",
      };
      const { data: userDataInfo } = await axiosPublic.put("/user", userInfo);
      if (userDataInfo?.upsertedCount > 0) {
        navigate(from, { replace: true });
        Swal.fire({
          title: `${name} Created Successfully`,
          icon: "success",
        });

      }
      console.log(userDataInfo);

      // navigate(from, { replace: true });
      // Swal.fire({
      //   title: `${name} Created Successfully`,
      //   icon: "success",
      // });
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: error.message,
      });
      setLoading(false);
    }

    // createUser(email, password)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log(user);
    //     updateUserProfile(name, photoUrl)
    //       .then(() => {
    //         const userInfo = {
    //           displayName: name,
    //           photoURL: photoUrl,
    //           email: email,
    //           role: "user",
    //           status: "verified",
    //         }
    //         console.log(userInfo);
    //         axiosPublic
    //           .post("/users", userInfo)
    //           .then(res => {
    //             console.log(res.data);
    //             if (res.data.insertedId) {
    //               reset();
    //               Swal.fire({
    //                 title: `${name} Created Successfully`,
    //                 icon: "success",
    //               });
    //               navigate(from, { replace: true });
    //             }
    //           })
    //           .catch(err => console.error(err));

    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  
  
  };

  return (
    <Container>
      <div className="hero w-full max-w-full min-h-screen bg-base-200">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className="hero-content max-w-full w-full  flex-col lg:flex-row">
          <div className="card shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              // className="card-body"
              className="p-8 grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              <h1 className="text-4xl font-bold text-center text-dark2 md:col-span-2 ">
                Sign_Up
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First name is required",
                    },
                  })}
                  placeholder="first name"
                  className={`input input-bordered ${
                    errors.firstName ? "input-error" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Last name is required",
                    },
                  })}
                  placeholder="last name"
                  className={`input input-bordered ${
                    errors.lastName ? "input-error" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="form-control md:col-span-2 ">
                <label className="label">
                  <span className="label-text">Select Image</span>
                </label>
                <input
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Please select an image",
                    },
                  })}
                  name="image"
                  type="file"
                  className={`file-input w-full ${
                    errors.image ? "input-error" : ""
                  }`}
                />
                {errors?.image && (
                  <p className="text-red-500"> {errors.image.message} </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
                  onInvalid={(e) => e.target.setCustomValidity("")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  placeholder="email"
                  className={`input input-bordered  ${
                    errors.email ? "input-error" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.type === "required"
                      ? errors.email.message
                      : errors.email.type === "pattern"
                      ? errors.email.message
                      : "Invalid email address"}
                  </p>
                )}
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      validate: (value) => {
                        if (value.length < 8) {
                          return "Password must have at least 8 characters";
                        } else if (
                          !/[A-Z]/.test(value) ||
                          !/[a-z]/.test(value) ||
                          !/[0-9]/.test(value) ||
                          !/[!@#$%^&*]/.test(value)
                        ) {
                          return "Password must have an uppercase, a lowercase, a number and a special character";
                        }
                      },
                    })}
                    type={showPass ? "password" : "text"}
                    placeholder="password"
                    className={`input input-bordered ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? "show" : "hide"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "Confirm password must match password";
                      }
                    },
                  })}
                  type="password"
                  placeholder="confirm password"
                  className={`input input-bordered ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="flex justify-center items-center loading loading-dots loading-sm"></span>
                  ) : (
                    "Sign UP"
                  )}
                </button>
              </div>
            </form>

            <p className=" my-4 text-center">
              Have an account ?{" "}
              <Link
                to="/login"
                className="text-appointBtnColor font-medium"
              >
                Sign In
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
