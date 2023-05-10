import React, {useState} from 'react';
import ExampleCards from './ExampleCards';
import ExampleLogComponent from './ExampleLogComponent';


const Examples = () => {
const [currentExample, setCurrentExample] = useState(0);
return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2vh'}}>
        <ExampleCards currentExample={currentExample} setCurrentExample={setCurrentExample}/>
        <ExampleLogComponent currentExample={currentExample} />
    </div>
  )
}

export default Examples;

export const examplesData = [
    {filePath: 'examples/BookLendingExample.bpmn', description: 'BPMN diagram describes library lending process. ', bpmnID: 0, title: 'Book Lending', imgPath: './images/book.jpg'},
    {filePath: 'examples/BookingExample.bpmn', description: 'This is a booking process that involves booking travel activities.', bpmnID: 1, title: 'Booking', imgPath: './images/travel.jpg'},
    {filePath: 'examples/CashMaschineExample.bpmn', description: ' Following example contatins process of cash flow in ATM cash maschine. ', bpmnID: 2, title: 'Cash Machine', imgPath: './images/cashMachine.jpg'},
    {filePath: 'examples/OnlineShopExample.bpmn', description: ' Diagram contains process of placing order in online shop. ', bpmnID: 3, title: 'Online Shop', imgPath: './images/onlineShop.jpg'},
    {filePath: 'examples/PizzaOrderingExample.bpmn', description: 'Ordering pizza in restaurant described by BPMN. ', bpmnID: 4, title: 'Pizza Ordering', imgPath: './images/pizza.jpg'}
]