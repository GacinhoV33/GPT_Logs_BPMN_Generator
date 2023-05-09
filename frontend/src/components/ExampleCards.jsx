import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { examplesData } from "./Examples";

const ExampleCards = ({ currentExample, setCurrentExample }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5vw",
      }}
    >
      {examplesData.map(({ filePath, description, bpmnID, title }, index) => {
        return (
          <ExampleCard key={`exampleCard-${index}`} title={title} setCurrentExample={setCurrentExample} currentExample={currentExample} bpmnID={bpmnID} description={description}/>
        );
      })}
    </div>
  );
};

export default ExampleCards;

const ExampleCard = ({ title, description, bpmnID, setCurrentExample, currentExample, imgPath }) => {
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
    <Card sx={{ maxWidth: "17.5vw" }} style={isSelectedCard ? {border: "2px solid #87a"} : undefined} raised={bpmnID === currentExample} key={`card-cont-${bpmnID}`}>
      <CardMedia
        sx={{ height: 70 }}
        image={imgPath}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(bpmnID)}>Show</Button>
      </CardActions>
    </Card>
  );
};
