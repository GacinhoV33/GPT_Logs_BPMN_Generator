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
    {filePath: 'examples/gpt_response2.bpmn', describtion: ' Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica', bpmnID: 0, title: 'Online Payment', imgPath: ''},
    {filePath: 'examples/gpt_response3.bpmn', describtion: '  Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica', bpmnID: 1, title: 'Online shop buying process', imgPath: ''},
    {filePath: 'examples/gpt_response4.bpmn', describtion: ' ... ', bpmnID: 2, title: 'Creating Website', imgPath: ''},
    {filePath: 'examples/gpt_response2.bpmn', describtion: '... ', bpmnID: 3, title: 'Adding employer too system', imgPath: ''},
    {filePath: 'examples/gpt_response3.bpmn', describtion: '... ', bpmnID: 4, title: 'Migrate database', imgPath: ''}
]