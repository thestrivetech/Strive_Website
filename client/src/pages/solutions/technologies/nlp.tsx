import { ArrowLeft, MessageSquare, Bot, Languages, FileText, Mic, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const NlpDocumentation = () => {
  return (
    <div className="min-h-screen bg-[#ffffffeb] pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/solutions">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Solutions
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Natural Language Processing
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridge the gap between human communication and machine understanding with advanced 
            NLP technologies that comprehend, analyze, and generate human language.
          </p>
        </div>

        {/* Overview Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">What is Natural Language Processing?</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="mb-4">
                Natural Language Processing (NLP) is a branch of AI that enables computers to understand, 
                interpret, and generate human language in a valuable way. It combines computational 
                linguistics with machine learning and deep learning models to process text and speech data.
              </p>
              <p className="mb-4">
                Our NLP solutions leverage transformer-based models, including GPT, BERT, and custom-trained 
                language models, to deliver state-of-the-art performance in text understanding, generation, 
                and translation tasks.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Capabilities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">NLP Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Bot className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Conversational AI</h3>
                <p className="text-muted-foreground">
                  Build intelligent chatbots and virtual assistants that understand context and provide 
                  natural, helpful responses to user queries.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Languages className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Language Translation</h3>
                <p className="text-muted-foreground">
                  Automatically translate text between multiple languages while preserving context, 
                  tone, and cultural nuances.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Text Analytics</h3>
                <p className="text-muted-foreground">
                  Extract insights from unstructured text data including sentiment analysis, entity 
                  recognition, and topic modeling.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Mic className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Speech Recognition</h3>
                <p className="text-muted-foreground">
                  Convert spoken language into text with high accuracy, enabling voice-controlled 
                  applications and transcription services.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Document Understanding</h3>
                <p className="text-muted-foreground">
                  Automatically process and extract information from documents, contracts, and forms 
                  with contextual understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <MessageSquare className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Content Generation</h3>
                <p className="text-muted-foreground">
                  Generate human-like text for various purposes including content creation, 
                  summarization, and personalized communications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Industry Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Customer Service</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 24/7 customer support chatbots</li>
                  <li>• Automated ticket routing and prioritization</li>
                  <li>• Customer feedback sentiment analysis</li>
                  <li>• Multi-language support systems</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Healthcare</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Clinical documentation and transcription</li>
                  <li>• Patient intake and symptom assessment</li>
                  <li>• Medical literature analysis</li>
                  <li>• Drug discovery research assistance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Legal & Compliance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Contract analysis and review</li>
                  <li>• Legal document summarization</li>
                  <li>• Compliance monitoring and reporting</li>
                  <li>• Due diligence automation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Marketing & Sales</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Content creation and optimization</li>
                  <li>• Social media monitoring and analysis</li>
                  <li>• Lead qualification and scoring</li>
                  <li>• Personalized email generation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Advanced NLP Features</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Sentiment Analysis</h3>
                <p className="text-muted-foreground mb-3">
                  Understand the emotional tone and opinion expressed in text, from customer reviews 
                  to social media posts.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Positive</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Neutral</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Negative</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Named Entity Recognition</h3>
                <p className="text-muted-foreground mb-3">
                  Identify and classify named entities such as people, organizations, locations, dates, 
                  and product names in text.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">Person</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm">Organization</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Location</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">Date</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Intent Classification</h3>
                <p className="text-muted-foreground">
                  Determine the purpose or goal behind user queries to route requests appropriately 
                  and provide relevant responses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Text Summarization</h3>
                <p className="text-muted-foreground">
                  Automatically generate concise summaries of long documents while preserving key 
                  information and context.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%+</div>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-sm text-muted-foreground">Languages Supported</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt;200ms</div>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Availability</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Unlock the Power of Language AI</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform how your business understands and interacts with human language. 
            Start your NLP journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore NLP Solutions
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NlpDocumentation;