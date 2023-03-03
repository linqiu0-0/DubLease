import React from "react";
import { Button } from "@mui/material";
import { Text } from "../../components/Text";
import { Img } from "../../components/Img";
import { Line } from "../../components/Line";
import { ReactComponent as Logo } from '../../assets/images/DubLeaseLogo.svg';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrivacyScrollDialog from './PrivacyScrollDialog';

const PromotionRight = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className=" border-colors2 border-solid inset-[0] flex items-start justify-start m-[auto] rounded-radius8 w-[100%]">
      <div className=" flex flex-col gap-[28px] inset-x-[0] justify-start mx-[auto] pt-[28px] top-[0] w-[100%]">
        <div className="flex flex-row items-center md:ml-[0] sm:ml-[0] ml-[20px] w-[auto]">
          <Logo />
          <Text
            className="font-bold mb-[2px] mt-[10px] text-indigo_900 text-left w-[auto]"
            variant="body3"
          >
            DubLease
          </Text>
        </div>
        <Line className="bg-deep_purple_50 h-[1px] w-[100%]" />
      </div>
      {/* Promotion*/}
      <div className="bg-gray_50 flex flex-col items-end justify-start md:gap-[40px] sm:gap-[40px] gap-[80px] h-[max-content] inset-y-[0]  my-[auto] pb-[134px] pr-[90px] sm:pr-[20px] md:pr-[40px] right-[0] w-[90%]">
        <div className="h-[642px] mr-[26px] relative sm:w-[100%] w-[96%]">
          <Img
            src="images/img_group.svg"
            className="absolute h-[300px] left-[2px] top-[0] w-[300px] o"
            alt="Group"
          />
          <div className="absolute bottom-[0] h-[514px] right-[0] sm:w-[100%] w-[84%]">
            <div className="absolute bg-white_A700 border border-gray_301 border-solid flex flex-col h-[max-content] inset-[0] items-center justify-center m-[auto] p-[24px] sm:px-[20px] rounded-radius8 shadow-bs4 w-[99%]">
              <div className="flex flex-col items-start justify-start w-[100%]">
                <Img
                  src="https://images1.apartments.com/i2/WCQqdTdOx7whsIN4SXA0qt-msh5dw_VGIju9PzqlhX4/111/hub-u-district-seattle-seattle-wa-primary-photo.jpg"
                  className="h-[212px] sm:h-[auto] object-cover md:w-[100%] sm:w-[100%] w-[auto]"
                  style={{ objectFit: "cover", width: "100%", aspectRatio: "4 / 3" }}
                  alt="Image One"
                />
                <div className="flex flex-row items-start justify-between mt-[32px] w-[100%]">
                  <div className="flex flex-col gap-[4px] items-start justify-start w-[auto]">
                    <Text
                      className="font-bold text-black_901 text-left tracking-ls02 md:tracking-ls111 sm:tracking-ls111 w-[auto]"
                      variant="body3"
                    >
                      Hub U District
                    </Text>
                    <Text
                      className="font-normal text-gray_601 text-left w-[auto]"
                      variant="body5"
                    >
                      5000 University Way NE, Seattle, WA
                    </Text>
                  </div>
                  <Button
                    className="flex h-[48px] items-center justify-center mb-[10px] rounded-radius501 w-[48px]"
                    size="mdIcn"
                    variant="icbOutlineIndigo50"
                  >
                    <Img
                      src="images/img_favorite.svg"
                      className="h-[24px] w-[24px]"
                      alt="Frame One"
                    />
                  </Button>
                </div>
                <Line className="bg-deep_purple_50 h-[1px] mt-[16px] w-[100%]" />
                <div className="flex flex-row gap-[16px] items-start justify-center mt-[14px] w-[auto]">
                  <div className="flex flex-row gap-[8px] items-center justify-center w-[auto]">
                    <Img
                      src="images/img_laptop.svg"
                      className="h-[20px] w-[20px]"
                      alt="laptop"
                    />
                    <Text
                      className="font-normal text-black_900_99 text-left w-[auto]"
                      variant="body6"
                    >
                      4 Beds
                    </Text>
                  </div>
                  <div className="flex flex-row gap-[8px] items-center justify-start w-[auto]">
                    <Img
                      src="images/img_lock.svg"
                      className="h-[20px] w-[20px]"
                      alt="settings"
                    />
                    <Text
                      className="font-normal text-black_900_99 text-left w-[auto]"
                      variant="body6"
                    >
                      2 Bathrooms
                    </Text>
                  </div>
                  <div className="flex flex-row gap-[8px] items-center justify-center w-[auto]">
                    <Img
                      src="images/img_mail.svg"
                      className="h-[20px] w-[20px]"
                      alt="ticket"
                    />
                    <Text
                      className="font-normal text-black_900_99 text-left w-[auto]"
                      variant="body6"
                    >
                      6x7.5 m²
                    </Text>
                  </div>
                </div>
                <div className="bg-gray_50 border border-deep_purple_50 border-solid flex flex-row justify-items-start items-center mt-[16px] p-[16px] rounded-radius8 w-[100%]">
                  <div className="flex flex-col gap-[8px] items-start justify-start w-[50%]">
                    <Text
                      className="font-bold text-black_901 text-left w-[100%]"
                      variant="body6"
                    >
                      Rent Sale
                    </Text>
                    <div className="flex flex-row gap-[2px] justify-start items-end  w-[100%]">
                      <div>
                        <Text
                          className="font-extrabold text-deep_purple_A200 text-left tracking-ls111 w-[100%]"
                          variant="body2"
                        >
                          $2,700
                        </Text>
                        <Text
                          className="font-normal text-black_900_87 text-left justify-self-start w-[auto]"
                          variant="body6"
                        >
                          /month
                        </Text>
                      </div>

                    </div>
                  </div>
                  <div className="justify-self-start">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large">
                      <FileCopyIcon />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex flex-col items-start justify-start left-[0] top-[43%] w-[25%]">
              <Button
                className="flex items-center justify-center text-center w-[100%]"
                size="md"
                variant="contained"
              >
                POPULAR
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] items-start justify-start sm:w-[100%] w-[auto]">
          <div className="flex flex-row gap-[8px] items-center justify-start w-[auto]">
            <Text
              className="font-normal text-black_901 text-left w-[auto]"
              variant="body6"
            >
              Powered by
            </Text>
            <Logo />
          </div>
          <Text
            className="font-normal leading-[150.00%] max-w-[448px] text-gray_601 text-left"
            variant="body7"
          >
            <span className="text-gray_601 text-[12px] font-plusjakartasans">
              You agree to Dub Lease's
            </span>
            <span className="text-gray_601 text-[12px] font-plusjakartasans">
              {" "}
            </span>
            <span className="text-deep_purple_A200 text-[12px] font-plusjakartasans" onClick={() => { setOpen(true) }}
            >
              Terms of Use & Privacy Policy
            </span>
            <span className="text-gray_601 text-[12px] font-plusjakartasans">
              .{" "}
            </span>
            <span className="text-gray_601 text-[12px] font-plusjakartasans">
              You don't need to consent as a condition of renting any
              property, or buying any other goods or services.
            </span>
          </Text>
        </div>
      </div>
      <PrivacyScrollDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export { PromotionRight };