import {useAtom} from 'jotai';
import {selectedContentAtom} from "../../Atoms/nemuAtom.ts";
import GetAllCustomer from "../Customer/GetAllCustomer.tsx";
import GetAllOrders from "../Order/GetAllOrders.tsx";
import AllProducts from "./AllProducts.tsx";
import GetAllTraits from "../Traits/GetAllTraits.tsx";





const Menu = () => {
    const [selectedContent, setSelectedContent] = useAtom(selectedContentAtom);

    return (
        <div>
            <div className="flex justify-center items-center sp">
                <button className="btn mx-2" onClick={() => setSelectedContent('Content 1')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#000000"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Customers
                </button>
                <button className="btn mx-2" onClick={() => setSelectedContent('Content 2')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048">
                        <path fill="currentColor"
                              d="m2029 1453l-557 558l-269-270l90-90l179 178l467-466zM1024 640H640V512h384zm0 256H640V768h384zm-384 128h384v128H640zM512 640H384V512h128zm0 256H384V768h128zm-128 128h128v128H384zm768-384V128H256v1792h896v128H128V0h1115l549 549v731l-128 128V640zm128-128h293l-293-293z"/>
                    </svg>
                    Orders
                </button>
                <button className="btn mx-2" onClick={() => setSelectedContent('Content 3')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048">
                        <path fill="currentColor"
                              d="M128 1920h1792v128H128v-128zm1792-1152v1024H128V768h1792zm-128 896V896H256v768h1536zm-384-640
                                 l-128 128H640l-128-128H128V256h1792v928z"/>
                    </svg>
                    Inventory
                </button>
            </div>
            <div>
                {selectedContent === 'Content 1' && <GetAllCustomer />}
                {selectedContent === 'Content 2' && <GetAllOrders/>}
                {selectedContent === 'Content 3' && <AllProducts />}
                {selectedContent === 'Content 4' && <GetAllTraits />}
            </div>
        </div>
    );
};

export default Menu;

