import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/3d-fluency-google-logo.png";
import githubIcon from "../../assets/github.png";
import { AuthContext } from "../../Auth_Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import Swal from "sweetalert2";
// import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { logIn, googleLogin, githubLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();
  console.log(from);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);
  if (errors?.email) {
    toast.error(errors.email?.message);
  }
  if (errors?.password) {
    toast.error(errors.password?.message);
  }
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    logIn(email, password)
      .then((result) => {
        setLoginError("");
        console.log("Login", result);
        navigate(from, { replace: true });
        Swal.fire({
          title: result?.user?.displayName || "Sweet!",
          text: "User Login Successfully",
          imageUrl: result?.user?.photoURL || "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          imageClass: "rounded-circle",
        });
      })
      .catch((error) => {
        setLoginError(error.message);
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          displayName: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
          status: "verified",
          role: "user",
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            navigate(from, { replace: true });
            console.log(res.data);
              Swal.fire({
                title: result?.user?.displayName || "Sweet!",
                text:
                  `${result?.user?.displayName} Login Successfully` ||
                  "User Login Successfully",
                imageUrl:
                  result?.user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                imageClass: "rounded-circle",
              });
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log(error));
  };
  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        console.log("Github Login", result);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  console.log(watch("example"));
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="hero flex justify-center items-center min-h-screen  bg-base-200">
        <div className="hidden md:hero-content  flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email field is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
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
                        message: "password field is required",
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
                    placeholder="password"
                    className="input input-bordered"
                    type={showPass ? "password" : "text"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-base focus:outline-none"
                  >
                    {showPass ? <HiEyeOff /> : <HiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600">{errors.password?.message}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="  text-signBtn btn btn-outline animate__pulse ">
                  Login
                </button>
              </div>
            </form>

            {loginError && <p className="text-red-600">{loginError}</p>}
            <div className="text-center">
              <p className="text-center ">Or Login with</p>
              <div className="flex justify-center items-center mt-5  gap-x-5">
                <button
                  onClick={handleGoogleLogin}
                  className="btn"
                >
                  <i>
                    <img
                      src={googleIcon}
                      className="w-10 h-10"
                      alt=""
                    />
                  </i>
                </button>

                <button
                  onClick={handleGithubLogin}
                  className="btn"
                >
                  <i>
                    <img
                      src={githubIcon}
                      alt=""
                    />
                  </i>
                </button>
              </div>
            </div>

            <p className="text-center my-5">
              Donot have any account?
              <Link
                to="/register"
                className="text-orange-600 font-bold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
