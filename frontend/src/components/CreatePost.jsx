import { AddIcon } from "@chakra-ui/icons"
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";
import {useRecoilValue,useRecoilState} from 'recoil';
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom.js";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;
const CreatePost = ()=>{
    
    const [posts,setPosts] = useRecoilState(postsAtom);
    const { handleImageChange, imgUrl ,setImgUrl} = usePreviewImg();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText,setPostText] = useState('')
    const imageRef = useRef(null)
    const [ remainingChar,setRemainingChar] = useState(MAX_CHAR)
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast()
    const {username} = useParams();
    const handleTextChange = (e)=>{ 
        const inputText = e.target.value;
        if(inputText.length > MAX_CHAR){
            const truncatedText = inputText.slice(0,MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(MAX_CHAR - truncatedText.length);
        }else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    };
    console.log(user._id);

    
    const handleCreatePost = async (e) => {
      e.preventDefault(); // Prevent form submission refresh
      
      try {
        const res = await fetch("/api/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            postedBy: user._id,
            text: postText,
            img: imgUrl
          }),
        });
    
        const data = await res.json();
        console.log(data)
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
    
        setPostText(""); // Reset form
        setImgUrl("");
        showToast("Success", "Post created successfully", "success");
        if(username === user.username){
          setPosts([data, ...posts]);
        }
        onClose();
    
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
     
    return(
        <>
        <Button
				position={"fixed"}
				bottom={10}
				right={5}
				
				onClick={onOpen}
				size={{ base: "sm", sm: "md" }}
			>
				<AddIcon />
			</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creat post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
          <Textarea 
                placeholder="post content goes here"
                onChange={handleTextChange}
                value={postText}
           />
                <Text fontSize={'sm'} color={'gray.800'} fontWeight='bold'
                textAlign={"right"}
                m={'1'}>
                  {remainingChar}/{MAX_CHAR} 
                </Text>
                <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
                />
               <BsFillImageFill
               style={{marginLeft:"5px",cursor:"pointer"}}
               size={16}
               onClick={()=>imageRef.current.click()}
               />
                
              </FormControl>
            {imgUrl && (
                <Flex mt={5} w={'full'} position={'relative'}>
                    <Image src={imgUrl} alt="Preview" />
                    <CloseButton
                     onClick={()=>{setImgUrl("")}}
                     position={'absolute'}
                     top={2}
                     right={2}
                     bg={'gray.800'}
                    />
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e)=>handleCreatePost(e)} >
              Post
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}
export default CreatePost;