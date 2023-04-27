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
      {examplesData.map(({ filePath, describtion, bpmnID, title }, index) => {
        return (
          <ExampleCard key={`exampleCard-${index}`} title={title} setCurrentExample={setCurrentExample} currentExample={currentExample} bpmnID={bpmnID}/>
        );
      })}
    </div>
  );
};

export default ExampleCards;

const ExampleCard = ({ title, describtion, bpmnID, setCurrentExample, currentExample }) => {
    const isSelectedCard = bpmnID === currentExample;
  return (
    <Card sx={{ maxWidth: 345 }} style={isSelectedCard ? {border: "2px solid #87a"} : undefined} raised={bpmnID == currentExample} key={`card-cont-${bpmnID}`}>
      <CardMedia
        sx={{ height: 70 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setCurrentExample(bpmnID)}>Show</Button>
      </CardActions>
    </Card>
  );
};
