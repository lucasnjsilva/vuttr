interface ToolInterface {
    name: string;
    description: string;
    link: string;
    user_id: string;
    tags: Array<{ tag: string }>;
}

export default ToolInterface;
