import { ArrowLeft, Eye, Camera, Scan, Shield, Activity, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const ComputerVisionDocumentation = () => {
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
            <Eye className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Computer Vision
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enable machines to interpret and understand visual information from the world, 
            transforming images and videos into actionable insights for your business.
          </p>
        </div>

        {/* Overview Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Understanding Computer Vision</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="mb-4">
                Computer Vision is a field of artificial intelligence that enables computers to derive 
                meaningful information from digital images, videos, and other visual inputs. By applying 
                machine learning models to visual data, systems can identify objects, detect anomalies, 
                and make decisions based on what they "see."
              </p>
              <p className="mb-4">
                Our computer vision solutions utilize state-of-the-art deep learning models, including 
                convolutional neural networks (CNNs) and advanced architectures like YOLO and Transformer-based 
                models, to deliver accurate and reliable visual analysis.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Capabilities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Core Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Camera className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Object Detection</h3>
                <p className="text-muted-foreground">
                  Identify and locate multiple objects within images or video streams in real-time, 
                  with bounding boxes and confidence scores.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Scan className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Image Classification</h3>
                <p className="text-muted-foreground">
                  Categorize images into predefined classes with high accuracy, enabling automated 
                  sorting and content moderation.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Facial Recognition</h3>
                <p className="text-muted-foreground">
                  Detect and identify faces for security, authentication, and personalization 
                  applications with privacy-first approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Activity className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Motion Tracking</h3>
                <p className="text-muted-foreground">
                  Track object movement across video frames for surveillance, sports analytics, 
                  and autonomous vehicle applications.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Image className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Image Segmentation</h3>
                <p className="text-muted-foreground">
                  Precisely segment images at pixel level to identify boundaries and separate 
                  different objects or regions of interest.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Eye className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">OCR & Text Recognition</h3>
                <p className="text-muted-foreground">
                  Extract and digitize text from images and documents, enabling automated data 
                  entry and document processing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Industry Applications */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Real-World Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Manufacturing & Quality Control</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Automated defect detection on production lines</li>
                  <li>• Product quality assessment and grading</li>
                  <li>• Assembly verification and compliance checking</li>
                  <li>• Predictive maintenance through visual inspection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Security & Surveillance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Threat detection and alert systems</li>
                  <li>• Perimeter monitoring and intrusion detection</li>
                  <li>• Crowd analysis and behavior monitoring</li>
                  <li>• License plate recognition for access control</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Healthcare & Medical Imaging</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• X-ray and MRI analysis for diagnosis</li>
                  <li>• Tumor detection and measurement</li>
                  <li>• Surgical assistance and guidance</li>
                  <li>• Patient monitoring and fall detection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Retail & E-commerce</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Visual search and product discovery</li>
                  <li>• Inventory management and shelf monitoring</li>
                  <li>• Customer behavior analytics</li>
                  <li>• Virtual try-on and augmented reality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Technical Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">30+ FPS</div>
                <p className="text-muted-foreground">Real-time processing speed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.1%</div>
                <p className="text-muted-foreground">Detection accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt;100ms</div>
                <p className="text-muted-foreground">Response latency</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Supported Formats & Integrations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Image Formats</p>
                  <p className="text-sm text-muted-foreground">JPEG, PNG, TIFF, RAW</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Video Formats</p>
                  <p className="text-sm text-muted-foreground">MP4, AVI, MOV, RTSP</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Frameworks</p>
                  <p className="text-sm text-muted-foreground">TensorFlow, PyTorch, OpenCV</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-medium">Deployment</p>
                  <p className="text-sm text-muted-foreground">Cloud, Edge, Mobile</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">See Computer Vision in Action</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of visual AI with our interactive demos and discover how computer 
            vision can revolutionize your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Request a Demo
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionDocumentation;