import { Box ,HStack,Text,Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";


export function ProductDetails(){
   
    const [loading,setLoading]=useState(false);
    let [objData,setObjData]=useState({})
    let  { id }=useParams();
     id=id.split(":");
     id=id[1];


    useEffect(()=>{
        getApiData();
    },[])
    async function getApiData(){
      
        setLoading(true);
        let res=await axios.get("https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products");
       
        
       let obj1= res.data.products?.find((el)=>el.id===id);
   console.log(obj1)

       setObjData(obj1);
      setLoading(false)
        }
    return(
        <>
        <Navbar/>
       
       {!loading &&  Object.keys(objData).length !== 0 ?
       <HStack justifyContent={"center"} my={"25px"}>
         <Image w={"400px"}  h={"500px"} src={objData?.gs1_images.front}/>
         <Box w={"400px"}  h={"500px"}  boxShadow='md'   margin="auto" p={"24px"}>
   
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Brand :</span> {objData?.brand}</Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Name :</span> {objData?.name}</Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Main Category :-</span> {objData?.main_category}</Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>type :</span> {objData?.type}</Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Description :</span> {objData?.derived_description} </Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Measurement :</span> {objData?.dimensions.width} * {objData?.dimensions.height} * {objData?.dimensions.depth} </Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Weight :</span>{objData?.weights_and_measures.net_weight}</Text>
  <Text my={"12px"}><span style={{fontWeight:"bold"}}>Made In :</span> {objData?.mrp.location}</Text>
   <Text my={"12px"}><span style={{fontWeight:"bold"}}>Price :</span> {objData?.mrp.mrp}</Text>
   </Box> 
       </HStack>
      : 
       <HStack justifyContent={"center"} my={"-115px"}>
        <Image src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"/>
    </HStack>

    }
       
        
        </>
    )
}