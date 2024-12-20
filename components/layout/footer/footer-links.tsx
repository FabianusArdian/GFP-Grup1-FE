export function FooterLinks() {
  return (
    <div className="border-t pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          © 2024 Local Food Market. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}