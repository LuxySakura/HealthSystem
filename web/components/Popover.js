import React from "react";
import { createPopper } from "@popperjs/core";

const Popover = () => {
    const [popoverShow, setPopoverShow] = React.useState(false);
    const btnRef = React.createRef();
    const popoverRef = React.createRef();
    const openTooltip = () => {
        createPopper(btnRef.current, popoverRef.current, {
            placement: "bottom"
        });
        setPopoverShow(true);
    };
    const closeTooltip = () => {
        setPopoverShow(false);
    };
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
                    <button
                        className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        onMouseEnter={openTooltip}
                        onMouseLeave={closeTooltip}
                        ref={btnRef}
                    >
                        阳性确诊
                    </button>
                    <div
                        className={
                            (popoverShow ? "" : "hidden ") +
                            "bg-orange-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                        }
                        ref={popoverRef}
                    >
                        <div>
                            <div
                                className="bg-orange-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg"
                            >
                                总数：43
                            </div>
                            <div className="text-white p-3">
                                今日新增：20
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const NonSen = () => {
    const [popoverShow, setPopoverShow] = React.useState(false);
    const btnRef = React.createRef();
    const popoverRef = React.createRef();
    const openTooltip = () => {
        createPopper(btnRef.current, popoverRef.current, {
            placement: "bottom"
        });
        setPopoverShow(true);
    };
    const closeTooltip = () => {
        setPopoverShow(false);
    };
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
                    <button
                        className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        onMouseEnter={openTooltip}
                        onMouseLeave={closeTooltip}
                        ref={btnRef}
                    >
                        无症状感染者
                    </button>
                    <div
                        className={
                            (popoverShow ? "" : "hidden ") +
                            "bg-teal-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                        }
                        ref={popoverRef}
                    >
                        <div>
                            <div
                                className="bg-teal-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg"
                            >
                                总数：50
                            </div>
                            <div className="text-white p-3">
                               今日新增：0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {
    Popover,
    NonSen
};
