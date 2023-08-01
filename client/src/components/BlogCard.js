import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import img from '../OIP.jpeg'

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  console.log(username)
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        mb: 3,
        padding: 2,
        boxShadow: " 10px 10px 10px 10px #777",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">

          </Avatar>
        }
        title={username}
        // title={username}

        subheader={time.substring(0, 10)}
      />
      <CardMedia component="img" height="fit-content" image={image} alt="error while loading" />
      <CardContent>
        <Typography variant="h3"
          sx={{
            mb: "2rem",
            textAlign: "center",
            textTransform: "capitalize"
          }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary"
          sx={{ letterSpacing: "2px" }}>
          Description : {description}

        </Typography>
      </CardContent>
    </Card>
  );
}
