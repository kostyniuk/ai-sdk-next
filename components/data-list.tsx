import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataListProps {
    title: string;
    data: Record<string, unknown>[];
    columns: string[]; // keys to display
}

export function DataList({ title, data, columns }: DataListProps) {
    if (!data || data.length === 0) {
        return (
            <Card className="w-full mb-4 bg-blue-500/10 backdrop-blur-sm border-blue-500/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">No data available.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full mb-4 bg-blue-500/10 backdrop-blur-sm border-blue-500/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="max-h-[300px] overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableHead key={col} className="h-8 text-xs px-4">{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item, i) => (
                                <TableRow key={(item.id as string | number) || i} className="h-8 hover:bg-muted/50">
                                    {columns.map((col) => (
                                        <TableCell key={col} className="py-2 text-xs px-4 font-light">{String(item[col])}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
