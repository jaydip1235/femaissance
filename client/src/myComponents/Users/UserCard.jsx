import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';


const UserCard = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <Card className='user-card cmt-card' sx={{ display: 'flex', height: 'fit-content', width: '375px', margin: '10px', backgroundColor: '#EDD2F3' }} >

                <CardMedia
                    component="img"
                    sx={{ maxWidth: 150 }}
                    image={props.profilePic}
                    alt="Live from space album cover"
                    className='comment-card-img rounded-circle'
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    <CardContent>

                        <Typography variant="button" display="block" gutterBottom>
                            {props.username}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            <EmailIcon className='author-icon' /> {props.email}
                        </Typography>

                    </CardContent>

                    <CardActions className='d-flex justify-content-end'>
                        <Button size="small"
                            onClick={async () => {
                                const res = await axios.post('https://femaissance.herokuapp.com/api/chat/createchat', { user1: props.currUserId, user2: props.id }, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${localStorage.getItem("fmToken")}`
                                    }
                                });
                                axios.post('https://femaissance.herokuapp.com/api/user/informuser', { roomId:res.data, userId:props.currUserId, otherId:props.id }, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${localStorage.getItem("fmToken")}`
                                    }
                                }).
                                then(()=>{
                                    console.log("jaydip")
                                    navigate(`/chat/${res.data}/${props.currUserId}/${props.id}`, { state: { userId: props.currUserId, roomId: res.data } });
                                }).
                                catch((err)=>console.log(err));
                                
                            }}
                        >Chat</Button>
                        <Button size="small"
                            onClick={() => {
                                navigate(`/dashboard/${props.id}`)
                            }}
                        >View</Button>
                    </CardActions>
                </Box>

            </Card>
        </>
    );
};

export default UserCard;