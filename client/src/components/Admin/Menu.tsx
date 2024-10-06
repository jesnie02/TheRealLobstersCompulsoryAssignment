import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { selectedContentAtom } from '../../Atoms/nemuAtom.ts';
import GetAllCustomer from '../Customer/GetAllCustomer.tsx';
import GetAllOrderHistory from '../Order/GetOrderHistory/GetAllOrderHistory.tsx';
import CreateTraits from '../Traits/CreateTraits.tsx';
import AllProducts from './AllProducts.tsx';

const Menu = () => {
    const [selectedContent, setSelectedContent] = useAtom(selectedContentAtom);

    useEffect(() => {
        const savedContent = localStorage.getItem('selectedContent');
        if (savedContent) {
            setSelectedContent(savedContent);
        }
    }, [setSelectedContent]);

    useEffect(() => {
        localStorage.setItem('selectedContent', selectedContent);
    }, [selectedContent]);

    return (
        <div>
            <div className="flex justify-center items-center sp">
                <button className="btn mx-2" onClick={() => setSelectedContent('Content 1')}>
                    <img src="/public/assets/ProfilePictures/AdminProfiles.png" alt="Orders" width="24" height="24" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473zM754 302l584 334l247-124l-625-313zm206 523l240-120l-584-334l-281 141zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34z"/></svg>
                    Traits
                </button>
                <button className="btn mx-2" onClick={() => setSelectedContent('Content 4')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048">
                        <path fill="currentColor"
                              d="M128 1920h1792v128H128v-128zm1792-1152v1024H128V768h1792zm-128 896V896H256v768h1536zm-384-640
                                 l-128 128H640l-128-128H128V256h1792v928z"/>
                    </svg>
                    Create Product
                </button>
            </div>
            <div>
                {selectedContent === 'Content 1' && <GetAllCustomer />}
                {selectedContent === 'Content 2' && <GetAllOrderHistory />}
                {selectedContent === 'Content 3' && < CreateTraits />}
                {selectedContent === 'Content 4' && < AllProducts/>}
            </div>
        </div>
    );
};

export default Menu;