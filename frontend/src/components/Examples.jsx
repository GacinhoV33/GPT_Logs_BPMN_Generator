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
    {filePath: 'examples/gpt_response2.bpmn', describtion: '', bpmnID: 0, title: 'Online Payment'},
    {filePath: 'examples/gpt_response3.bpmn', describtion: '', bpmnID: 1, title: 'Online shop buying process'},
    {filePath: 'examples/gpt_response4.bpmn', describtion: '', bpmnID: 2, title: 'Creating Website'},
    {filePath: 'examples/gpt_response2.bpmn', describtion: '', bpmnID: 3, title: 'Adding employer too system'},
    {filePath: 'examples/gpt_response3.bpmn', describtion: '', bpmnID: 4, title: 'Migrate database'}
]