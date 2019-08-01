import Link from "next/link";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import TimeStamp from "components/timestamp";

export default ({ sys, fields }) => (
    <Card>
        <Link href={`/post?id=${sys.id}`} as={`/post/${fields.slug}`}>
            <CardHeader title={fields.title} />
        </Link>
        <CardContent>
        <TimeStamp date={sys.createdAt} />
        </CardContent>
    </Card>
);