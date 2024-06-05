import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photoURL:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    const name = data.firstName + " " + data.lastName;
    const photoUrl = data.photoURL;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(name, photoUrl)
          .then(() => {
            console.log("profile updated");
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12 ">
          <img alt="" />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
          >
            <h1 className="text-4xl font-bold text-center text-dark2 ">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("photoURL", {
                  pattern: {
                    value: /^https?:\/\/[\da-z.-]+\.[a-z]{2,6}\/*/i,
                    message: "Invalid photo URL",
                  },
                })}
                placeholder="photo URL"
                className={`input input-bordered ${
                  errors.photoURL ? "input-error" : ""
                }`}
              />
              {errors.photoURL && (
                <p className="text-red-500">{errors.photoURL.message}</p>
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
                className={`input input-bordered ${
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
            <div className="form-control">
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
                  {showPass ? (
                    "show"
                  ) : (
                   "hide"
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="form-control">
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
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign_Up</button>
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
  );
};

export default Register;
