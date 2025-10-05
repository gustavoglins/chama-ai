'use client';

import ApiSidebar from '@/components/api-sidebar';
import {
  TypographyCode,
  CodeLanguage,
} from '@/components/typography/TypographyCode';
import { code, dedent } from '@/components/typography/code-builder';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

export default function ApiReferencePage() {
  return (
    <SidebarProvider>
      <div className="flex gap-4">
        <Sidebar
          collapsible="none"
          className="hidden md:block w-[16rem] shrink-0 bg-transparent border-r border-sidebar-border"
        >
          <ApiSidebar />
        </Sidebar>

        <section className="flex-1 p-4 md:p-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              API Reference
            </h1>
            <p className="text-sm text-muted-foreground">
              Browse endpoints and SDK guides on the left. Pick a section to get
              started.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-medium">Welcome</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Select an endpoint or topic from the sidebar to view detailed
                documentation, parameters, and examples.
              </p>
            </div>

            {/* Exemplo 1: Usando code builder */}
            <TypographyCode
              title="Example request"
              language="bash"
              code={code()
                .line('curl https://api.openai.com/v1/images/generations \\')
                .line('  -H "Content-Type: application/json" \\')
                .line('  -H "Authorization: Bearer $OPENAI_API_KEY" \\')
                .line("  -d '{")
                .line('    "model": "gpt-image-1",')
                .line('    "prompt": "A cute baby sea otter",')
                .line('    "n": 1,')
                .line('    "size": "1024x1024"')
                .line("  }'")
                .build()}
            />

            {/* Exemplo 2: Usando dedent template tag */}
            <TypographyCode
              title="Response"
              language="json"
              code={dedent`
                {
                  "created": 1713833628,
                  "data": [
                    {
                      "b64_json": "..."
                    }
                  ],
                  "usage": {
                    "total_tokens": 180,
                    "input_tokens": 56,
                    "output_tokens": 59
                  }
                }
              `}
            />

            {/* Exemplo 3: Com seletor de linguagem dinâmico */}
            <TypographyCode
              title="Example request"
              languages={[
                CodeLanguage.CURL,
                CodeLanguage.PYTHON,
                CodeLanguage.JAVA,
                CodeLanguage.NODEJS,
              ]}
              language={CodeLanguage.CURL}
              showLanguageSelector
              codeByLanguage={{
                [CodeLanguage.CURL]: dedent`
                  curl https://api.openai.com/v1/images/generations \\
                    -H "Content-Type: application/json" \\
                    -H "Authorization: Bearer $OPENAI_API_KEY" \\
                    -d '{
                      "model": "gpt-image-1",
                      "prompt": "A cute baby sea otter",
                      "n": 1,
                      "size": "1024x1024"
                    }'
                `,
                [CodeLanguage.PYTHON]: dedent`
                  from openai import OpenAI
                  client = OpenAI()

                  response = client.images.generate(
                    model="gpt-image-1",
                    prompt="A cute baby sea otter",
                    n=1,
                    size="1024x1024"
                  )
                  print(response.data[0].url)
                `,
                [CodeLanguage.JAVA]: dedent`
                  import com.openai.OpenAI;
                  import com.openai.models.ImageGenerateParams;

                  public class Main {
                    public static void main(String[] args) {
                      OpenAI client = new OpenAI();

                      ImageGenerateParams params = ImageGenerateParams.builder()
                        .model("gpt-image-1")
                        .prompt("A cute baby sea otter")
                        .n(1)
                        .size("1024x1024")
                        .build();

                      var response = client.images().generate(params);
                      System.out.println(response.getData().get(0).getUrl());
                    }
                  }
                `,
                [CodeLanguage.NODEJS]: dedent`
                  import OpenAI from 'openai';

                  const openai = new OpenAI();

                  async function main() {
                    const image = await openai.images.generate({
                      model: "gpt-image-1",
                      prompt: "A cute baby sea otter",
                      n: 1,
                      size: "1024x1024",
                    });
                    console.log(image.data);
                  }

                  main();
                `,
              }}
            />

            {/* Exemplo 4: Formato simples (código único) */}
            <TypographyCode
              title="Component example"
              languages={['tsx', 'jsx', 'typescript', 'javascript']}
              showLanguageSelector
              code={dedent`
                <Input type="password" placeholder="Senha" />
                <Input type="email" placeholder="Email" />
                <Input type="text" placeholder="Nome" />
              `}
            />

            {/* Exemplo 5: Forma tradicional (ainda funciona) */}
            <TypographyCode language="python" title="Python SDK">
              {`from openai import OpenAI
client = OpenAI()

response = client.images.generate(
  model="gpt-image-1",
  prompt="A cute baby sea otter",
  n=1,
  size="1024x1024"
)`}
            </TypographyCode>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
}
