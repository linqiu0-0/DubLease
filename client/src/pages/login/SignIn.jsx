import React from "react";
import { Link } from "react-router-dom"
import { TextField, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

import { PromotionRight } from "./Promotion.jsx";
import { Text } from "../../components/Text";

const SignIn = () => {
  const formRef = React.useRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = ({ event }) => {
    event.preventDefault();
  };


  return (
    <>
      <div className="bg-white_A700 font-plusjakartasans h-[950px] mx-[auto] relative w-[100%]">
        <div className="absolute flex flex-col gap-[32px] gap-x-[32px] gap-y-[32px] h-[950px] items-start justify-start ml-[160px] mt-[0] md:pl-[20px] sm:pl-[20px] md:pr-[20px] sm:pr-[20px] top-[176px] w-[auto]">
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

          <form ref={formRef} className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
            <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[352px]">
              <Text
                className="font-medium text-black_901 text-left w-[auto]"
                variant="body6"
              >
                Email
              </Text>
              <TextField
                required
                id="email"
                className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                type="email"
                label="hi@example.com"
                size="30ch"
                variant="outlined"

              ></TextField>
            </div>
            <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
              <div className="flex flex-col gap-[8px] h-[100%] items-start justify-start w-[100%]">
                <Text
                  className="font-medium text-black_901 text-left w-[auto]"
                  variant="body6"
                >
                  Password
                </Text>
                <FormControl sx={{ m: 0, width: '30ch' }} color="secondary" variant="outlined" required>
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
            </div>

            <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
              <Button
                className="cursor-pointer font-bold text-[16px] text-center text-white_A700 w-[352px] bg-deep_purple_A200_75 text-white_A700"
                shape="RoundedBorder8"
                size="3xl"
                variant="contained"
                color="secondary"
                onClick={() => formRef.current.reportValidity()}
              >
                Login
              </Button>
            </div>
          </form>
          <Text
            className="font-normal text-gray_601 text-left w-[auto]"
            variant="body6"
          >
            <span className="text-gray_601 text-[14px] font-plusjakartasans">
              Don’t have an account?{" "}
            </span>
            <Link className="text-deep_purple_A200 text-[14px] font-plusjakartasans font-bold"
              to="../signup">
              Sign up for free
            </Link>
          </Text>
        </div>
        <PromotionRight />
      </div>
    </>
  );
};

export default SignIn;
