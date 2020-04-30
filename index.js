export const server = ({ app }) => {
  app.use(
    get("/*.xml", async ctx => {
      const origin = ctx.settings.state.sitemap.orign;
      const frontityUrl = ctx.settings.state.frontity.url;
      // Get the original sitemap from the WordPress site.
      const response = await fetch(`${origin}/${ctx.path}`);
      const body = await response.text();
      // Replace the URLs of WordPress for URLs of Frontity.
      ctx.body = body.replaceAll(origin, frontityUrl);
      // Do not cache this.
      ctx.set("cache-control: no-cache");
    })
  );
};
