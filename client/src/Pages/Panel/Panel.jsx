import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Button
  } from "@chakra-ui/react";
import PanelStyles from "../Panel/Panel.module.css";
export function Panel()
{
    const [users,setUsers]=React.useState([]);



    async  function getUsers()
    {
        try 
        {
          const res=await fetch("/getUsers",{
            headers:{"x-access-token":localStorage.getItem("token")}
          }) 
          const data=await res.json();
          
          if(data.status==="ok")
          {
            setUsers(data.users)
          }

          

        }

        catch (error) 
        {
            console.log(error);
        }
    }

    React.useEffect(()=>
    {
        getUsers()
    },[])




    return(
        <>
        <Navbar/>
        <div>
            {
                users.length!==0?
                <div className={PanelStyles.UsersURLContainer}>
                    <TableContainer className={PanelStyles.TableContainer}>
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>No.</Th>
                                    <Th>User Name</Th>
                                    <Th>User Email</Th>
                                    <Th>Type</Th>
                                    <Th>Date of Register</Th>
                                    <Th>Last Login Date</Th>
                                    <Th>Number of logins</Th>
                                </Tr>
                                
                            </Thead>
                            <Tbody>
                                {
                                    users?.map((item,i)=>
                                    (
                                        <Tr key={i} >
                                            <Td>{i+1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.email}</Td>
                                            <Td>{item.type}</Td>
                                            <Td>{item.account_creation}</Td>
                                            <Td>{item.last_loggin}</Td>
                                            <Td>{item.no_of_loggins}</Td>

                                        </Tr>
        
                                    ))
                                }
                            </Tbody>
                        </Table>

                    </TableContainer>
                </div>:
                <div>

                </div>
            }

        </div>

        </>
    )
}