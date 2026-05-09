import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { lessons, getLesson } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

export default function ProgressPage() {
  const { entries, reset } = useProgress();
  const total = lessons.length;
  const done = entries.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleReset = async () => {
    await reset();
    toast.success("Progress reset");
  };

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Your Progress</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{done} of {total} lessons completed</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={pct} />
            <p className="text-sm text-muted-foreground mt-2">{pct}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Completed lessons</CardTitle>
            {entries.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">Reset Progress</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently removes all your completion records. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No lessons completed yet — head to the Lessons page to get started.</p>
            ) : (
              <ul className="divide-y">
                {entries.map((e) => {
                  const lesson = getLesson(e.slug);
                  return (
                    <li key={e.slug} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="font-medium">{lesson?.title ?? e.slug}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(e.completedAt).toLocaleDateString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
