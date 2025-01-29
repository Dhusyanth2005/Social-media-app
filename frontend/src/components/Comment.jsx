import { Flex, Avatar, Divider, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = (props) => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Flex gap={4} py={2} my={2} w={'full'}>
                <Avatar src={props.userAvatar} size={'sm'} />
                <Flex gap={1} w={'full'} flexDirection={'column'}>
                    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontSize={'sm'} fontWeight="bold">{props.username}</Text>
                        <Flex gap={1} alignItems={'center'}>
                            <Text fontSize={'sm'} color={'gray.500'}>{props.createdAt}</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{props.comment}</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <Text fontSize={'sm'} color={'gray.500'}>
                        { props.likes + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>
            <Divider my={4} />
        </>
    );
}

export default Comment;