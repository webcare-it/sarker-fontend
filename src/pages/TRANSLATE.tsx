import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Loader2, Languages } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { apiErrorHandler } from "@/api/utils/error";
import { revalidateQueryFn } from "@/lib/query-client";
import { getLangCode } from "@/helper";
import { SectionTitle } from "@/components/common/section-title";

export const TranslatePage = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_to_translate"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/translations/save", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res) {
        const langKey = res?.data?.lang_key;
        setTranslatedText(langKey);
        setShowResponse(true);
        toast.success("Translation completed!");
        revalidateQueryFn("get_translations");
      }
    },
    onError: (error) => {
      toast.error("Translation failed. Please try again.");
      console.error("Translation error:", error);
      return apiErrorHandler(error);
    },
  });

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }
    const formData = new FormData();
    formData.append("lang", getLangCode() as string);
    formData.append("lang_value", inputText);

    mutate(formData);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy error:", error);
    }
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setShowResponse(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl h-full">
      <SectionTitle title="Translation Tool" />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Translation Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="input-text"
                className="block text-sm font-medium mb-2">
                Enter text to translate:
              </label>
              <Textarea
                id="input-text"
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px]"
                disabled={isPending}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleTranslate}
                disabled={isPending || !inputText.trim()}
                className="flex items-center gap-2">
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4" />
                    Translate
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleClear}
                disabled={isPending}>
                Clear
              </Button>
            </div>
          </div>

          {showResponse && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Translation Result:
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border min-h-[120px]">
                <p className="whitespace-pre-wrap">{translatedText}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
