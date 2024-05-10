// images.d.ts

// Declare a module for image files
declare module "*.jpg" {
  const value: string; // The image file path
  export default value;
}
