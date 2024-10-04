import { Api } from '../../Api';
import { OrderDto, CreateCustomerDto } from '../../Api';

const api = new Api();

export const handleCreateOrder = async (
    cart: { id: number; price: number; quantity?: number }[],
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerAddress: string,
    deliveryDate: string,
    setOrders: React.Dispatch<React.SetStateAction<OrderDto[]>>,
    onClose: () => void
) => {
    try {
        // Validate input before proceeding
        if (!cart || cart.length === 0) {
            throw new Error('Cart is empty');
        }

        let customerId: number | undefined;
        try {
            const response = await api.api.customerGetCustomerIdByEmail(customerEmail);
            customerId = response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                // If customer not found, create a new one
                const newCustomer: CreateCustomerDto = {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    address: customerAddress,
                };

                const createdCustomer = await api.api.customerCreateCustomer(newCustomer);
                customerId = createdCustomer.data.id;
            } else {
                throw error;
            }
        }

        // Validate the cart items to ensure valid product IDs
        const orderEntries = cart.map(item => ({
            productId: item.id,  // Ensure 'id' exists in the cart items
            quantity: item.quantity || 1, // Default to 1 if quantity not provided
        }));

        // Check if orderEntries are properly populated
        if (orderEntries.length === 0 || orderEntries.some(item => !item.productId)) {
            throw new Error('Invalid cart items');
        }

        // Create the order with valid customerId and totalAmount
        const newOrder: OrderDto = {
            customerId: customerId,
            totalAmount: cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0), // Multiply price with quantity
            orderEntries: orderEntries,
            orderDate: new Date().toISOString(), // Add current date as orderDate
            deliveryDate: deliveryDate, // Use the selected delivery date
            status: 'Pending' // Add default status
        };

        console.log('Creating order with payload:', JSON.stringify(newOrder, null, 2)); // Log the payload

        const createdOrder = await api.api.orderCreateOrder(newOrder);
        setOrders(prevOrders => [...prevOrders, createdOrder.data]);

        onClose();
    } catch (error: any) {
        console.error('Error creating order:', error);
        alert('Error creating order: ' + error.message);  // Inform the user of the error
    }
};