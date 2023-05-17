import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ExampleCards = ({ currentExample, setCurrentExample, examplesData, isGPT }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5vw",
      }}
    >
      {examplesData.map(({ filePath, description, bpmnID, title, imgPath }, index) => {
        return (
          <ExampleCard key={`exampleCard-${index}`} title={title} setCurrentExample={setCurrentExample} currentExample={currentExample} bpmnID={bpmnID} description={description} imgPath={imgPath} isGPT={isGPT}/>
        );
      })}
    </div>
  );
};

export default ExampleCards;

const ExampleCard = ({ title, description, bpmnID, setCurrentExample, currentExample, imgPath, isGPT }) => {
    const isSelectedCard = bpmnID === currentExample;
    function handleClick(bpmnID){
      setCurrentExample(bpmnID);
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: document.body.scrollHeight
      })
    }
  return (
    <Card sx={{ width: "17.5vw" , height: isGPT ? '1250px' : '325px'}} style={isSelectedCard ? {border: "2px solid #87a"} : undefined} raised={bpmnID === currentExample} key={`card-cont-${bpmnID}`}>
      <CardMedia
        sx={{ height: 175 }}
        image={imgPath}
        title="green iguana"
      />
      <CardContent style={{fontSize: isGPT ? '10px' : null}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {isGPT ?  <Typography gutterBottom variant="h6" component="div">
          Prompt:
        </Typography> : null}
        <Typography variant="body2" color="text.secondary" >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(bpmnID)}>Show</Button>
      </CardActions>
    </Card>
  );
};
