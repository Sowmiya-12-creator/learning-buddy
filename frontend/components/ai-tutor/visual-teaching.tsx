"use client";

import {
    ArrowDown,
    ArrowRight,
    BarChart3,
    GitBranch,
    ImageIcon,
    Lightbulb,
    Network,
    Table2,
} from "lucide-react";

import {
    VisualTeaching as VisualTeachingType,
} from "@/services/ai-tutor.service";


interface VisualTeachingProps {
    visual: VisualTeachingType;
}


// ============================================================
// Main Component
// ============================================================

export default function VisualTeaching({
    visual,
}: VisualTeachingProps) {

    if (!visual) {
        return null;
    }

    const visualType =
        visual.visual_type?.toLowerCase();

    const steps =
        visual.steps ?? [];


    // ========================================================
    // Timeline
    // ========================================================

    const renderTimeline = () => (

        <div className="mt-6 space-y-0">

            {steps.map((step, index) => (

                <div
                    key={step.step}
                    className="relative flex gap-4"
                >

                    {/* Timeline Line */}

                    {index !== steps.length - 1 && (

                        <div className="absolute left-5 top-10 h-full w-px bg-violet-400/30" />

                    )}


                    {/* Step Number */}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">

                        {step.step}

                    </div>


                    {/* Content */}

                    <div className="pb-8">

                        <h4 className="font-semibold text-violet-200">
                            {step.title}
                        </h4>

                        <p className="mt-1 leading-6 text-gray-300">
                            {step.description}
                        </p>

                    </div>

                </div>
            ))}

        </div>
    );


    // ========================================================
    // Flowchart
    // ========================================================

    const renderFlowchart = () => (

        <div className="mt-6 flex flex-col items-center">

            {steps.map((step, index) => (

                <div
                    key={step.step}
                    className="flex w-full max-w-xl flex-col items-center"
                >

                    <div className="w-full rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5 text-center">

                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-300">

                            Step {step.step}

                        </div>

                        <h4 className="font-semibold text-white">
                            {step.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-gray-300">
                            {step.description}
                        </p>

                    </div>


                    {index !== steps.length - 1 && (

                        <ArrowDown className="my-3 h-6 w-6 text-violet-400" />

                    )}

                </div>
            ))}

        </div>
    );


    // ========================================================
    // Mind Map
    // ========================================================

    const renderMindMap = () => (

        <div className="mt-6">

            {/* Central Topic */}

            <div className="mx-auto flex max-w-sm items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-500/20 p-5 text-center">

                <div>

                    <Network className="mx-auto mb-2 h-6 w-6 text-violet-300" />

                    <div className="font-semibold text-white">
                        {visual.title}
                    </div>

                </div>

            </div>


            {/* Branch Line */}

            {steps.length > 0 && (

                <div className="mx-auto h-8 w-px bg-violet-400/30" />

            )}


            {/* Branches */}

            <div className="grid gap-4 md:grid-cols-2">

                {steps.map((step) => (

                    <div
                        key={step.step}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >

                        <div className="mb-2 flex items-center gap-2">

                            <GitBranch className="h-4 w-4 text-violet-300" />

                            <span className="text-xs font-semibold uppercase tracking-wide text-violet-300">

                                Branch {step.step}

                            </span>

                        </div>

                        <h4 className="font-semibold text-white">
                            {step.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-gray-300">
                            {step.description}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );


    // ========================================================
    // Comparison / Table
    // ========================================================

    const renderComparison = () => (

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">

                <Table2 className="h-4 w-4 text-violet-300" />

                <span className="text-sm font-semibold text-violet-200">
                    Comparison
                </span>

            </div>


            <div className="divide-y divide-white/10">

                {steps.map((step) => (

                    <div
                        key={step.step}
                        className="grid gap-2 p-4 md:grid-cols-[180px_1fr]"
                    >

                        <div className="font-semibold text-violet-200">
                            {step.title}
                        </div>

                        <div className="leading-6 text-gray-300">
                            {step.description}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );


    // ========================================================
    // Diagram / Illustration
    // ========================================================

    const renderDiagram = () => (

        <div className="mt-6">

            <div className="mx-auto mb-5 flex max-w-md items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/10 p-8 text-center">

                <div>

                    <ImageIcon className="mx-auto mb-3 h-10 w-10 text-violet-300" />

                    <div className="font-semibold text-white">
                        {visual.title}
                    </div>

                    <div className="mt-2 text-sm text-gray-300">
                        {visual.description}
                    </div>

                </div>

            </div>


            <div className="grid gap-4 md:grid-cols-2">

                {steps.map((step) => (

                    <div
                        key={step.step}
                        className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                    >

                        <div className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">

                            {step.step}

                        </div>

                        <h4 className="font-semibold text-violet-200">
                            {step.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-gray-300">
                            {step.description}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );


    // ========================================================
    // Sequence / Step Animation
    // ========================================================

    const renderSequence = () => (

        <div className="mt-6 overflow-x-auto pb-2">

            <div className="flex min-w-max items-stretch">

                {steps.map((step, index) => (

                    <div
                        key={step.step}
                        className="flex items-center"
                    >

                        <div className="w-56 rounded-2xl border border-white/10 bg-white/5 p-4">

                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">

                                {step.step}

                            </div>

                            <h4 className="font-semibold text-violet-200">
                                {step.title}
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-300">
                                {step.description}
                            </p>

                        </div>


                        {index !== steps.length - 1 && (

                            <ArrowRight className="mx-3 h-6 w-6 shrink-0 text-violet-400" />

                        )}

                    </div>
                ))}

            </div>

        </div>
    );


    // ========================================================
    // Graph
    //
    // We currently receive descriptive visual steps rather
    // than numeric x/y datasets. Therefore this displays a
    // conceptual graph-style representation instead of
    // inventing numerical values.
    // ========================================================

    const renderGraph = () => (

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="mb-5 flex items-center gap-2">

                <BarChart3 className="h-5 w-5 text-violet-300" />

                <span className="font-semibold text-violet-200">
                    Concept Graph
                </span>

            </div>


            <div className="space-y-5">

                {steps.map((step, index) => {

                    const width =
                        Math.min(
                            100,
                            35 +
                            (
                                (index + 1) /
                                Math.max(steps.length, 1)
                            ) * 65
                        );

                    return (

                        <div key={step.step}>

                            <div className="mb-2 flex items-center justify-between gap-4">

                                <span className="text-sm font-medium text-gray-200">
                                    {step.title}
                                </span>

                                <span className="text-xs text-gray-500">
                                    Step {step.step}
                                </span>

                            </div>


                            <div className="h-3 overflow-hidden rounded-full bg-white/10">

                                <div
                                    className="h-full rounded-full bg-violet-500"
                                    style={{
                                        width: `${width}%`,
                                    }}
                                />

                            </div>


                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                {step.description}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );


    // ========================================================
    // Default Process
    // ========================================================

    const renderProcess = () => (

        <div className="mt-6 grid gap-4 md:grid-cols-2">

            {steps.map((step) => (

                <div
                    key={step.step}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >

                    <div className="mb-3 flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">

                            {step.step}

                        </div>

                        <h4 className="font-semibold text-violet-200">
                            {step.title}
                        </h4>

                    </div>

                    <p className="leading-6 text-gray-300">
                        {step.description}
                    </p>

                </div>
            ))}

        </div>
    );


    // ========================================================
    // Select Visual Renderer
    // ========================================================

    const renderVisual = () => {

        switch (visualType) {

            case "timeline":
                return renderTimeline();

            case "flowchart":
                return renderFlowchart();

            case "mind_map":
                return renderMindMap();

            case "comparison":
            case "table":
                return renderComparison();

            case "diagram":
            case "illustration":
                return renderDiagram();

            case "sequence":
            case "step_animation":
                return renderSequence();

            case "graph":
                return renderGraph();

            case "process":
            case "other":
            default:
                return renderProcess();
        }
    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="mt-6 overflow-hidden rounded-2xl border border-violet-400/20 bg-violet-500/5">

            {/* Header */}

            <div className="border-b border-white/10 px-5 py-4">

                <div className="flex items-center gap-2">

                    <Lightbulb className="h-5 w-5 text-violet-300" />

                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">

                        Visual Learning

                    </span>

                </div>


                <h3 className="mt-2 text-lg font-semibold text-white">

                    {visual.title}

                </h3>


                {visual.description && (

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">

                        {visual.description}

                    </p>

                )}

            </div>


            {/* Dynamic Visual */}

            <div className="p-5">

                {steps.length > 0 ? (

                    renderVisual()

                ) : (

                    <p className="text-sm text-gray-400">

                        No visual steps are available for this lesson.

                    </p>

                )}

            </div>

        </div>
    );
}