#pragma checksum "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b743df5f277565c865dc946de113a428436e8499"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_DailyFitnesses_Delete), @"mvc.1.0.view", @"/Views/DailyFitnesses/Delete.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/DailyFitnesses/Delete.cshtml", typeof(AspNetCore.Views_DailyFitnesses_Delete))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\_ViewImports.cshtml"
using WakePal_WebApp;

#line default
#line hidden
#line 2 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\_ViewImports.cshtml"
using WakePal_WebApp.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b743df5f277565c865dc946de113a428436e8499", @"/Views/DailyFitnesses/Delete.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e087111d52c1ac0dbafc9691d482efa76816549a", @"/Views/_ViewImports.cshtml")]
    public class Views_DailyFitnesses_Delete : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<WakePal_WebApp.Models.DailyFitness>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", "hidden", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Index", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Delete", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(43, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 3 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
  
    ViewData["Title"] = "Delete";

#line default
#line hidden
            BeginContext(87, 173, true);
            WriteLiteral("\r\n<h2>Delete</h2>\r\n\r\n<h3>Are you sure you want to delete this?</h3>\r\n<div>\r\n    <h4>DailyFitness</h4>\r\n    <hr />\r\n    <dl class=\"dl-horizontal\">\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(261, 47, false);
#line 15 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.FitnessDate));

#line default
#line hidden
            EndContext();
            BeginContext(308, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(352, 43, false);
#line 18 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.FitnessDate));

#line default
#line hidden
            EndContext();
            BeginContext(395, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(439, 42, false);
#line 21 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Weight));

#line default
#line hidden
            EndContext();
            BeginContext(481, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(525, 38, false);
#line 24 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Weight));

#line default
#line hidden
            EndContext();
            BeginContext(563, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(607, 41, false);
#line 27 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Steps));

#line default
#line hidden
            EndContext();
            BeginContext(648, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(692, 37, false);
#line 30 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Steps));

#line default
#line hidden
            EndContext();
            BeginContext(729, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(773, 41, false);
#line 33 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Water));

#line default
#line hidden
            EndContext();
            BeginContext(814, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(858, 37, false);
#line 36 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Water));

#line default
#line hidden
            EndContext();
            BeginContext(895, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(939, 44, false);
#line 39 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Calories));

#line default
#line hidden
            EndContext();
            BeginContext(983, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1027, 40, false);
#line 42 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Calories));

#line default
#line hidden
            EndContext();
            BeginContext(1067, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(1111, 42, false);
#line 45 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Floors));

#line default
#line hidden
            EndContext();
            BeginContext(1153, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1197, 38, false);
#line 48 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Floors));

#line default
#line hidden
            EndContext();
            BeginContext(1235, 43, true);
            WriteLiteral("\r\n        </dd>\r\n        <dt>\r\n            ");
            EndContext();
            BeginContext(1279, 40, false);
#line 51 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.User));

#line default
#line hidden
            EndContext();
            BeginContext(1319, 43, true);
            WriteLiteral("\r\n        </dt>\r\n        <dd>\r\n            ");
            EndContext();
            BeginContext(1363, 42, false);
#line 54 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
       Write(Html.DisplayFor(model => model.User.Email));

#line default
#line hidden
            EndContext();
            BeginContext(1405, 38, true);
            WriteLiteral("\r\n        </dd>\r\n    </dl>\r\n    \r\n    ");
            EndContext();
            BeginContext(1443, 214, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66300f2c88a24c838084ad7783d252bf", async() => {
                BeginContext(1469, 10, true);
                WriteLiteral("\r\n        ");
                EndContext();
                BeginContext(1479, 43, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("input", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "2ddf2c59b81646ee97af5f3ebc33071b", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.InputTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.InputTypeName = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
#line 59 "C:\!ARCHIVUM\coursework\wakepal\webapp\WakePal_WebApp\WakePal_WebApp\Views\DailyFitnesses\Delete.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For = ModelExpressionProvider.CreateModelExpression(ViewData, __model => __model.FitnessId);

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-for", __Microsoft_AspNetCore_Mvc_TagHelpers_InputTagHelper.For, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1522, 84, true);
                WriteLiteral("\r\n        <input type=\"submit\" value=\"Delete\" class=\"btn btn-default\" /> |\r\n        ");
                EndContext();
                BeginContext(1606, 38, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cc177fd1e77542de9e09f4da602dc439", async() => {
                    BeginContext(1628, 12, true);
                    WriteLiteral("Back to List");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(1644, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Action = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1657, 10, true);
            WriteLiteral("\r\n</div>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<WakePal_WebApp.Models.DailyFitness> Html { get; private set; }
    }
}
#pragma warning restore 1591
