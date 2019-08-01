import Link from "next/link";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

export default ({ sys, fields }) => (
    <Card>
        <Link href={`/post?id=${sys.id}`}>
            <CardHeader
                title={fields.title}
                // subheader={fields.subtitle}
            />
        </Link>
        <CardContent>
            <Typography variant="h6">
                {(new Date(sys.createdAt).toLocaleString())}
            </Typography>
        </CardContent>
    </Card>
);