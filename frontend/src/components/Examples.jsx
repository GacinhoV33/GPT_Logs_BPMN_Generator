import React, {useState} from 'react';
import ExampleCards from './ExampleCards';
import ExampleLogComponent from './ExampleLogComponent';


const Examples = () => {
const [currentExample, setCurrentExample] = useState(0);
return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2vh'}}>
        <ExampleCards currentExample={currentExample} setCurrentExample={setCurrentExample}/>
        <ExampleLogComponent currentExample={currentExample}/>
    </div>
  )
}

export default Examples;

export const examplesData = [
    {filePath: '', describtion: '', bpmnID: 0, title: 'Online Payment'},
    {filePath: '', describtion: '', bpmnID: 1, title: 'Online shop buying process'},
    {filePath: '', describtion: '', bpmnID: 2, title: 'Creating Website'},
    {filePath: '', describtion: '', bpmnID: 3, title: 'Adding employer too system'},
    {filePath: '', describtion: '', bpmnID: 4, title: 'Migrate database'}
]