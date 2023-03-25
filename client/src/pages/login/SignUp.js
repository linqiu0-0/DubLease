import React from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import PasswordChecklist from "react-password-checklist"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"


import { PromotionRight } from "./Promotion.jsx";
import { Text } from "../../components/Text";

const SignUp = () => {
    const formRef = React.useRef();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [signedup, setSignUp] = React.useState(false);
    const [passValid, setPassValid] = React.useState(false); // check if password format valid

    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("")



    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = ({ event }) => {
        event.preventDefault();
    };


    const updateSignupData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": email, "password": password, "username": username })
        };
        console.log(requestOptions.body);
        fetch(process.env.REACT_APP_SERVER_URL + "signup", requestOptions)
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                navigate('/', {
                    state: {
                        username: data.username
                    }
                });
            })
            .catch(handleError);
    }

    function handleError(error) {
        console.log(error);
    }

    function checkStatus(response) {
        if (!response.ok) {
            response.text().then(txt => { console.log(txt); });
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    const handleSignUpEvent = () => {
        setSignUp(true);
        formRef.current.reportValidity();
        if (signedup) {
            updateSignupData();
        }
    };

    return (
        <>
            <div className="bg-white_A700 font-plusjakartasans mx-[auto] relative w-[100%]">
                <div className="absolute flex flex-col gap-[32px] gap-x-[32px] gap-y-[32px] items-start justify-start ml-[160px] mt-[0] md:pl-[20px] sm:pl-[20px] md:pr-[20px] sm:pr-[20px] top-[176px] w-[auto]">
                    <div className="flex flex-col gap-[8px] items-start justify-start w-[auto]">
                        <Text
                            className="text-black_901 text-left tracking-ls032 md:tracking-ls111 sm:tracking-ls111 w-[auto]"
                            as="h5"
                            variant="h5"
                        >
                            Welcome!
                        </Text>
                        <Text
                            className="font-normal text-black_900_87 text-left w-[auto]"
                            variant="body5"
                        >
                            Welcome! Please enter your details.
                        </Text>
                    </div>
                    <form ref={formRef} className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
                        <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[352px]">
                            <Text
                                className="font-medium text-black_901 text-left w-[auto]"
                                variant="body6"
                            >
                                User Name
                            </Text>
                            <TextField
                                required
                                id="username"
                                className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                label="User Name"
                                size="30ch"
                                variant="outlined"
                                onChange={e => setUsername(e.target.value)}
                            ></TextField>
                        </div>
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
                                onChange={e => setEmail(e.target.value)}
                            ></TextField>
                        </div>
                        <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[352px]">
                            <div className="flex flex-col gap-[8px] h-[100%] items-start justify-start w-[100%]">
                                <Text
                                    className="font-medium text-black_901 text-left w-[auto]"
                                    variant="body6"
                                >
                                    Password
                                </Text>
                                <FormControl sx={{ m: 0, width: '39ch' }} color="secondary" variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        required
                                        id="outlined-adornment-password2"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => setPassword(e.target.value)}
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
                        <div className="flex flex-col gap-[8px] h-[100%] items-start justify-start w-[100%]">
                            <Text
                                className="font-medium text-black_901 text-left w-[auto]"
                                variant="body6"
                            >
                                Reter Enter Password
                            </Text>
                            <FormControl sx={{ m: 0, width: '39ch' }} color="secondary" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Reter Enter Password</InputLabel>
                                <OutlinedInput
                                    required
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    color="secondary"
                                    onChange={e => setPasswordAgain(e.target.value)}
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
                                    label="Reter Enter Password"
                                />
                            </FormControl>
                        </div>

                    </form>
                    {signedup && !passValid && <div className="flex flex-col gap-[8px] h-[120px] md:h-[auto] sm:h-[auto] items-start justify-start w-[352px]">
                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={5}
                            value={password}
                            valueAgain={passwordAgain}
                            onChange={(isValid) => { setPassValid(isValid) }}
                        />
                    </div>}
                    <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">
                        <Button
                            className="cursor-pointer font-bold text-[16px] text-center text-white_A700 w-[352px] bg-deep_purple_A200_75 text-white_A700"
                            shape="RoundedBorder8"
                            size="3xl"
                            variant="contained"
                            color="secondary"
                            onClick={handleSignUpEvent}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <Text
                        className="font-normal text-gray_601 text-left w-[auto]"
                        variant="body6"
                    >
                        <span className="text-gray_601 text-[14px] font-plusjakartasans">
                            Already have an account?{" "}
                        </span>
                        <Link className="text-deep_purple_A200 text-[14px] font-plusjakartasans font-bold"
                            to="/signin">
                            Login
                        </Link>
                    </Text>
                </div>
                <PromotionRight />
            </div>
        </>
    );
};

export default SignUp;