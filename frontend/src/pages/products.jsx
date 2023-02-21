
import {Grid,Box,Image, SimpleGrid,Text, HStack, Input, Button, Select, VStack,useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { height } from "@mui/system";
import { Navbar } from "../components/navbar";

export function Products(){
    const [data,setData]=useState([]);
    const [apiData,setApiData]=useState([]);
    const [searchVal,setSearchVal]=useState("");
   const [pageVal,setPageVAl]=useState(1);
   const [loading,setLoading]=useState(false)
  const toast=useToast()


//    Api call
   async function getData(){
    setLoading(true);
    let res=await axios.get(`https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${pageVal}`);
    setData(res.data.products);
    setApiData(res.data.products)
  setLoading(false)
    console.log(res.data)
}

 useEffect(()=>{
    getData();
 
 },[pageVal])


// searchFilter
 const searchFilter=()=>{
   
 let data1=apiData.filter((el)=>el.company_detail.name.toLowerCase().includes(searchVal));
 if(data1.length===0){
    return  toast({
        title: 'Not Found.',
        description: "Product for this name not found.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
 }
 console.log(data1)
 setData(data1);
 }


//  filterByCat
const filterByCat=(val)=>{
  
if(val==="all"){
  return  setData(apiData)
}
else if(val==="Food"){
    let data1=apiData.filter((el)=>el.gs1category===val); 
    console.log(data1)
    return setData(data1)
}
else if(val==="Household"){
    let data1=apiData.filter((el)=>el.gs1category===val); 
    console.log(data1)
    return setData(data1)
}
else if(val==="Beverages"){
    let data1=apiData.filter((el)=>el.gs1category===val); 
    return setData(data1)
}


}


// price sorting
 
const callSort=(val)=>{
   
    if(val==="low"){
        data.sort(function(a,b){
            return Number(a.mrp.mrp)-Number(b.mrp.mrp);
        });
        setData([...data])
    }
    else{
        data.sort(function(a,b){
            return Number(b.mrp.mrp)-Number(a.mrp.mrp);
        });
        setData([...data]) 
    }
}

// gotoDetailsPage
const navigate=useNavigate();
const gotoDetailsPage=(id)=>{
    console.log(id);
   navigate(`details/:${id}`)
}
    return(
        <>
      <Navbar/>

<HStack justifyContent={"center"}>
    <Input onChange={(e)=>setSearchVal(e.target.value)} w={"20%"} bgColor={"white"}  placeholder="Search Items"/>
    <Button onClick={searchFilter} colorScheme={"blue"}>Search</Button>
</HStack>

   <HStack  justifyContent={"center"} my={"35px"} align={"start"} >

   <Select onChange={(e)=>filterByCat(e.target.value) } placeholder='Filter By Category' w={"12%"}>
  <option value='all'>All</option>
  <option value='Food'>Food</option>
  <option value='Household'>Household</option>
  <option value='Beverages'>Beverages</option>
</Select>

<Select onChange={(e)=>callSort(e.target.value)} placeholder='Price' w={"12%"}>
  <option value='low'>low to high</option>
  <option value='high'>high to low</option>
 
</Select>
</HStack>
   {
    !loading ?<SimpleGrid w={"85%"} margin={"auto"} textAlign={"start"} gap={"45px"} align={"center"} columns={{ base: 1, sm: 2, md: 3,lg:4}}>

    {/* mapping of products */}
         {
        data?.map((el)=>{
            return (
           
<Box  boxShadow='md' p={"25px"} onClick={()=>gotoDetailsPage(el.id)} >
   <Image  margin={"auto"} style={{width:"200px", height:"250px"}} alt={el.company_detail.name} src={el.gs1_images.front}/>
   <Text><span style={{fontWeight:"bold"}}>Brand :</span> {el.brand}</Text>
   <Text><span style={{fontWeight:"bold"}}>Name :</span> {el.company_detail.name}</Text>
   <Text><span style={{fontWeight:"bold"}}>Category :</span> {el.gs1category}</Text>
   <Text><span style={{fontWeight:"bold"}}>MRP :</span> {el.mrp.mrp}</Text>
  </Box>


            )
        })
    }</SimpleGrid>
    :
    <HStack justifyContent={"center"} my={"-115px"}>
        <Image src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"/>
    </HStack>
   }
  

 <HStack  justifyContent={"center"} my={"55px"}>
      <Button _hover={{bgColor:"#075A2B"}} color={"white"} 
       bgColor={"#2F9C44"} isDisabled={pageVal===1} onClick={()=>setPageVAl(pageVal-1)}>PREV</Button>
 <Button 
 _hover={{bgColor:"none"}}
 color={"white"} bgColor={"#2F9C44"}>{pageVal}</Button>
 <Button _hover={{bgColor:"#075A2B"}} color={"white"} bgColor={"#2F9C44"} 
 onClick={()=>setPageVAl(pageVal+1)}>NEXT</Button>
 </HStack>
        </>
    )
}