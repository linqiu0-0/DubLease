import React from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

import {PromotionRight} from "./Promotion.jsx";
import {Text} from "../../components/Text";

const SignIn = () => {
//   const googleSignIn = useGoogleLogin({
//     onSuccess: (res) => {
//       console.log("res", res);
//       alert("Login successfull. 😍");
//     },
//     onFailure: (err) => {
//       alert(err?.details ?? "Failed to login. 😢");
//     },
//   });
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = ({event}) => {
  event.preventDefault();
};

  return (
    <>
      <div className="bg-white_A700 flex flex-col font-plusjakartasans items-end justify-start mx-[auto] sm:pl-[20px] md:pl-[40px] pl-[80px] py-[80px] w-[100%]">
        <div className="bg-white_A700 h-[950px] mb-[14px] md:pl-[20px] sm:pl-[20px] md:pr-[20px] sm:pr-[20px] relative md:w-[100%] sm:w-[100%] w-[99%]">
          <div className="flex-col gap-[32px] grid items-center justify-start ml-[160px] mt-[176px] w-[auto]">
            <div className="flex flex-col gap-[8px] items-start justify-start w-[auto]">
              <Text
                className="text-black_901 text-left tracking-ls032 md:tracking-ls111 sm:tracking-ls111 w-[auto]"
                as="h5"
                variant="h5"
              >
                Welcome back
              </Text>
              <Text
                className="font-normal text-black_900_87 text-left w-[auto]"
                variant="body5"
              >
                Welcome back! Please enter your details.
              </Text>
            </div>
            <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
              <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[352px]">
                <Text
                  className="font-medium text-black_901 text-left w-[auto]"
                  variant="body6"
                >
                  Email
                </Text>
                <TextField
                  id="email"
                  className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                  type="email"
                  label="hi@example.com"
                  size="md"
                  variant="outlined"
                ></TextField>
              </div>
              <div className="flex flex-col gap-[8px] h-[104px] md:h-[auto] sm:h-[auto] items-end justify-end w-[auto]">
                <div className="flex flex-col gap-[8px] h-[100%] items-start justify-start w-[100%]">
                  <Text
                    className="font-medium text-black_901 text-left w-[auto]"
                    variant="body6"
                  >
                    Password
                  </Text>
                  <FormControl sx={{ m: 0, width: '30ch' }} color="secondary" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput 
                      id="outlined-adornment-password" 
                      type={showPassword ? 'text' : 'password'} 
                      color="secondary"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                           color="secondary"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="flex flex-col justify-center w-[352px]">
                  <Text
                    className="font-medium text-deep_purple_A200 text-left w-[auto]"
                    variant="body6"
                  >
                    Forgot Password?
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
              <Button
                className="cursor-pointer font-bold text-[16px] text-center text-white_A700 w-[352px] bg-deep_purple_A200_75 text-white_A700"
                shape="RoundedBorder8"
                size="3xl"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
              {/* <Button // google sign in
                className="flex items-center justify-center text-center w-[352px]"
                onClick={googleSignIn}
                leftIcon={
                  <img
                    src="images/img_google.svg"
                    className="mr-[10px] text-center"
                    alt="google"
                  />
                }
                shape="RoundedBorder8"
                size="4xl"
                variant="OutlineGray301"
              > 
                <div className="common-pointer bg-colors border border-colors1 border-solid cursor-pointer flex flex-row font-bold gap-[20px] items-start justify-around no-underline pl-[40px] py-[8px] rounded-radius8 text-[16px] text-black_901 text-justify w-[100%]">
                  Continue with Google
                </div>
              </Button>*/}
            </div>
            <Text
              className="font-normal text-gray_601 text-left w-[auto]"
              variant="body6"
            >
              <span className="text-gray_601 text-[14px] font-plusjakartasans">
                Don’t have an account?{" "}
              </span>
              <span className="text-black_901 text-[14px] font-plusjakartasans font-bold">
                Sign up for free
              </span>
            </Text>
          </div>
          <PromotionRight/>
        </div>
      </div>
    </>
  );
};

export default SignIn;
