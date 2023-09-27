import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
// TODO Do something with mobile size of it.
export default function HorizontalCard() {
    return (
        <>
        <div className="flex flex-row justify-center items-center mx-auto p-8 w-full mb-40 mt-40 ">

            <Card className="lg:w-3/4 md:w-4/5 w-5/6 flex-row md:h-[30rem] lg:h-[40rem]">
                <div
                    className="m-0 w-full h-full rounded z-0 absolute"
                >
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="z-20 flex flex-col items-center justify-center absolute w-full h-full">
                    <Typography variant="h6" color="white" className="mb-4 uppercase">
                        startups
                    </Typography>
                    <Typography variant="h4" color="white" className="mb-2">
                        Lyft launching cross-platform service this week
                    </Typography>
                    <Typography color="white" className="mb-8 font-normal">
                        Like so many organizations these days, Autodesk is a company in
                        transition. It was until recently a traditional boxed software company
                        selling licenses. Yet its own business model disruption is only part
                        of the story
                    </Typography>
                    <a href="#" className="inline-block">
                        <Button className="flex items-center gap-2">
                            Learn More
                        </Button>
                    </a>
                </div>
            </Card>
            </div>
        </>

    );
}