import TotalViewModalBody from "../ModalBodies/TotalViewModalBody";

const TotalViewModal = (props) => {
    const { updationList,TViewToggle, setTViewToggle } = props;
    // console.log(updationList)
    return (
        <div>
            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!TViewToggle && "hidden"} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full p-10`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t light:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 light:text-white">
                                Your all updations
                            </h3>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-5 overflow-y-auto overflow-x-hidden max-h-[70vh]">
                            {
                                updationList.map((upList)=>(
                                    <TotalViewModalBody 
                                        key={upList._id}
                                        description={upList.description}
                                        operation={upList.operation}
                                        amount = {upList.maximum}
                                    />

                                ))
                            }

                            <div className="flex justify-center pt-2 pb-1">
                                <button type='button' onClick={() => setTViewToggle((TViewToggle) => !TViewToggle)} className="relative px-5 py-3  overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group" >
                                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TotalViewModal
