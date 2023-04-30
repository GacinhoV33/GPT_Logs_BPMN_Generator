import re
import lxml.etree as etree


def clean_xml(xml_string: str):
    # Remove all white characters
    cleaned_xml = re.sub(r"[\r\n]+", "", xml_string)
    # Filter in all content inside < > brackets
    cleaned_xml = "".join(re.findall(r'<.*?>', cleaned_xml))

    # Parse XML to check if it's well-formed
    try:
        x = etree.fromstring(cleaned_xml)
        cleaned_pretty_xml = etree.tostring(x, pretty_print=True)
        return cleaned_pretty_xml

    except:
        raise ValueError("Given XML is not well-formed")

#
