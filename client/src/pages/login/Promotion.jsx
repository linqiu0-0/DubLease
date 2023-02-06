import React from "react";
import { Button } from "@mui/material";
import {Text} from "../../components/Text";
import {Img} from "../../components/Img";
import {Line} from "../../components/Line";

const PromotionRight = () => {
    return (
        <div className=" border-colors2 border-solid h-[950px] inset-[0] justify-center m-[auto] rounded-radius8 w-[100%]">
        <div className=" flex flex-col gap-[28px] inset-x-[0] justify-start mx-[auto] pt-[28px] top-[0] w-[100%]">
          <div className="flex flex-col items-start justify-center md:ml-[0] sm:ml-[0] ml-[48px] w-[auto]">
            <div className="flex flex-col items-start justify-start w-[134px]">
              <div className="flex flex-col items-center justify-start p-[4px] w-[100%]">
                <div className="flex flex-row items-end justify-evenly md:w-[100%] sm:w-[100%] w-[94%]">
                  <Img
                    src="images/img_notification.svg"
                    className="h-[32px] w-[32px]"
                    alt="notification"
                  />
                  <Text
                    className="font-bold mb-[2px] mt-[8px] text-indigo_900 text-left w-[auto]"
                    variant="body4"
                  >
                    DubLease
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <Line className="bg-deep_purple_50 h-[1px] w-[100%]" />
        </div>
        <div className="absolute bg-gray_50 flex flex-col md:gap-[40px] sm:gap-[40px] gap-[80px] h-[max-content] inset-y-[0] items-end justify-start my-[auto] pb-[134px] pr-[134px] sm:pr-[20px] md:pr-[40px] right-[0] w-[49%]">
          <div className="h-[642px] mr-[26px] relative sm:w-[100%] w-[96%]">
            <Img
              src="images/img_group.svg"
              className="absolute h-[300px] left-[0] top-[0] w-[300px]"
              alt="Group"
            />
            <div className="absolute bottom-[0] h-[514px] right-[0] sm:w-[100%] w-[84%]">
              <div className="absolute bg-white_A700 border border-gray_301 border-solid flex flex-col h-[max-content] inset-[0] items-center justify-center m-[auto] p-[24px] sm:px-[20px] rounded-radius8 shadow-bs4 w-[99%]">
                <div className="flex flex-col items-start justify-start w-[100%]">
                  <Img
                    src="images/img_image.png"
                    className="h-[212px] sm:h-[auto] object-cover md:w-[100%] sm:w-[100%] w-[auto]"
                    alt="Image One"
                  />
                  <div className="flex flex-row items-start justify-between mt-[32px] w-[100%]">
                    <div className="flex flex-col gap-[4px] items-start justify-start w-[auto]">
                      <Text
                        className="font-bold text-black_901 text-left tracking-ls02 md:tracking-ls111 sm:tracking-ls111 w-[auto]"
                        variant="body3"
                      >
                        Beverly Springfield
                      </Text>
                      <Text
                        className="font-normal text-gray_601 text-left w-[auto]"
                        variant="body5"
                      >
                        2821 Sevilla, Palm Harbor, TX
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
                  <div className="bg-gray_50 border border-deep_purple_50 border-solid flex flex-row items-center justify-between mt-[16px] p-[16px] rounded-radius8 w-[100%]">
                    <div className="flex flex-col gap-[8px] items-start justify-start w-[auto]">
                      <Text
                        className="font-bold text-black_901 text-left w-[auto]"
                        variant="body6"
                      >
                        Rent Sale
                      </Text>
                      <div className="flex flex-row gap-[2px] items-end justify-start w-[auto]">
                        <Text
                          className="font-extrabold text-deep_purple_A200 text-left tracking-ls111 w-[auto]"
                          variant="body2"
                        >
                          $2,700
                        </Text>
                        <Text
                          className="font-normal text-black_900_87 text-left w-[auto]"
                          variant="body6"
                        >
                          /month
                        </Text>
                      </div>
                    </div>
                    <Button
                      className="font-bold mb-[12px] mr-[8px] mt-[8px] sm:mx-[0] sm:px-[20px] px-[24px] text-[14px] text-left text-white_A700 sm:w-[100%] w-[48%]"
                      placeholderClassName="text-white_A700"
                      name="Button"
                      placeholder="Apply now"
                      isSearchable={false}
                      isMulti={false}
                      getOptionLabel={(e) => (
                        <div className="flex items-center">
                          <Img
                            src="images/img_menu.svg"
                            className="h-[20px] mr-[8px] w-[20px]"
                            alt="menu"
                          />
                          <span>{e.label}</span>
                        </div>
                      )}
                      indicator={
                        <Img
                          src="images/img_arrowdown_white_a700.svg"
                          className="h-[16px] w-[16px]"
                          alt="arrow_down"
                        />
                      }
                      shape="RoundedBorder8"
                      size="lg"
                      variant="FillIndigo900"
                    ></Button>
                  </div>
                </div>
              </div>
              <div className="absolute flex flex-col items-start justify-start left-[0] top-[43%] w-[25%]">
                <Button
                  className="flex items-center justify-center text-center w-[100%]"
                  leftIcon={
                    <Img
                      src="images/img_volume.svg"
                      className="mr-[4px] text-center"
                      alt="volume"
                    />
                  }
                  shape="CustomBorderTL8"
                  size="md"
                //   variant="FillDeeppurpleA200"
                variant="contained"
                >
                  <div className="bg-transparent cursor-pointer font-bold text-[12px] text-left text-white_A700 tracking-ls05 md:tracking-ls1 sm:tracking-ls1 w-[100%]">
                    POPULAR
                  </div>
                </Button>
                <Img
                  src="images/img_vector2.svg"
                  className="h-[8px] w-[8px]"
                  alt="VectorTwo"
                />
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
              <Img
                src="images/img_home.svg"
                className="h-[24px] w-[24px]"
                alt="notification One"
              />
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
              <span className="text-deep_purple_A200 text-[12px] font-plusjakartasans">
                Terms of Use & Privacy Policy
              </span>
              <span className="text-gray_601 text-[12px] font-plusjakartasans">
                .{" "}
              </span>
              <span className="text-gray_601 text-[12px] font-plusjakartasans">
                You don't need to consent as a condition of renting any
                property, or buying any other goods or services.
                Message/data rates may apply.
              </span>
            </Text>
          </div>
        </div>
       </div>
    );
};

export {PromotionRight};