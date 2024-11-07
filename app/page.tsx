"use client";

import {Loader2} from "lucide-react";
import React, {useRef, useEffect, useState} from "react";
import {set} from "@internationalized/date/src/manipulation";

const SignaturePad = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
    const [mode, setMode] = useState<any>(true); //true for basic, false for linear
    const [result, setResult] = useState<any>(null);
    const [operation, setOperation] = useState<any>(null);
    const initializeCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 8;
            ctx.strokeStyle = "#000000";
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const parentWidth = canvas.parentElement?.offsetWidth || 0;
            const dpr = window.devicePixelRatio || 1;

            // Set actual size in memory
            canvas.width = parentWidth * dpr;
            canvas.height = 400 * dpr;

            // Set display size
            canvas.style.width = `${parentWidth}px`;
            canvas.style.height = "400px";

            // Scale context to match device pixel ratio
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.scale(dpr, dpr);
                initializeCanvas(canvas);
            }
        }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;

        setIsDrawing(true);
        const [x, y] = getCoordinates(e, canvas);
        setCurrentPath([{x, y}]);

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const [x, y] = getCoordinates(e, canvas);
        setCurrentPath((prev) => [...prev, {x, y}]);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            ctx.closePath();
        }
        setCurrentPath([]);
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement): [number, number] => {
        const rect = canvas.getBoundingClientRect();
        if ("touches" in e) {
            const touch = e.touches[0];
            return [touch.clientX - rect.left, touch.clientY - rect.top];
        } else {
            return [e.clientX - rect.left, e.clientY - rect.top];
        }
    };

    const clearPad = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const saveSignature = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        tempCtx.fillStyle = "#ffffff";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempCtx.drawImage(canvas, 0, 0);


        tempCanvas.toBlob(async (blob) => {
            if (!blob) return;

            const formData = new FormData();
            formData.append("file", blob, "signature.png");
            formData.append("mode", mode ? "basic" : "linear");
            try {
                const response = await fetch("http://127.0.0.1:5000/predict", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                console.log(result);
                setResult(result.result);
                setOperation(result.operation);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        }, "image/png");


        // const link = document.createElement("a");
        // link.href = dataUrl;
        // link.download = "signature.png";
        // link.click();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        resizeCanvas();
        initializeCanvas(canvas);

        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="relative w-full bg-[#D4EEFC] overflow-hidden">
                <img className="absolute" src="/images/hero_img.png" alt=""/>
                <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">
                    <div className="flex justify-center mb-20">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
                            <div className="bg-[#D4EEFC] rounded-lg relative">
                                <img src="/images/hero.webp" alt="Handwriting Practice" className="w-full rounded-lg"/>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-center text-gray-900 max-w-4xl mx-auto">Solve Your
                        Mathematics Doubt</h1>
                    <div className={"w-full h-20 flex p-2 justify-center items-center gap-4"}>
                        <button onClick={() => {
                            setMode(true)
                        }}
                                className={` ${mode ? "bg-blue-600 text-white" : "bg-white"} w-fit h-fit p-2 border-gray-500 border-1 text-xl hover:bg-blue-600 hover:text-white transition`}>Basic
                            Calculator
                        </button>
                        <button onClick={() => {
                            setMode(false)
                        }}
                                className={` ${!mode ? "bg-blue-600 text-white" : "bg-white"} w-fit h-fit p-2 border-gray-500 border-1 text-xl hover:bg-blue-600 hover:text-white transition`}>Linear
                            Equations
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Write Here</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <canvas
                                ref={canvasRef}
                                className="border-2 border-dashed border-gray-300 rounded-lg bg-white cursor-crosshair touch-none"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                                style={{
                                    width: "100%",
                                    height: "600px",
                                    backgroundColor: "#fff",
                                }}
                            />
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            <button
                                onClick={clearPad}
                                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                Clear
                            </button>
                            <button
                                onClick={saveSignature}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5"/>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Submit</span>
                                )}
                            </button>
                            <button
                                onClick={() => document.getElementById('fileInput')?.click()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5"/>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Upload</span>
                                )}
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                style={{display: 'none'}}
                                onChange={handleFileUpload}
                            />
                        </div>
                        <div className={"flex flex-col justify-center  gap-2 mt-4 w-full "}>
                            <h1 className={"text-3xl font-bold "}>Operation:
                                <span
                                    className={"text-2xl text-blue-600 font-bold"}>{operation}
                                </span>
                            </h1>
                            <h1 className={"text-3xl font-bold "}>Result:
                                <span
                                    className={"text-2xl text-blue-600 font-bold"}>{mode?result:result?Object.keys(result).map((key)=>{
                                    return ` ${key} : ${result[key]}`
                                }):""}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignaturePad;
